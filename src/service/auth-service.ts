import { tokenService } from './token-service';
import { ApiError } from '../exceptions/api-error';
import { UserSchema } from '../models/db/user-schema';
import { UserModel } from '../models/user/user-model';
import { DEFAULT_CURRENCY_CODE } from '../config/currencies';
import { Roles } from '../enums/roles';

const bcrypt = require('bcrypt');

class AuthService {
  async registration(email: string, password: string, firstName: string, lastName: string) {
    const candidate = await UserSchema.findOne({ email });

    if (candidate) {
      throw ApiError.EmailAlreadyExist();
    }

    const hashPassword = await bcrypt.hash(password, 3);

    const user = await UserSchema.create({ email, password: hashPassword, firstName, lastName, role: Roles.Admin, defaultCurrencyCode: DEFAULT_CURRENCY_CODE });

    const userDto = new UserModel({
      ...user.toObject(),
      _id: user._id.toString(),
    });

    const tokens = tokenService.generateTokens({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens }
  }


  async login(email: any, password: any) {
    const role = Roles.Admin;
    const user = await UserSchema.findOne({ email, role });

    if (!user) {
      throw ApiError.BadRequest('User not found');
    }
    const isPassEquals = await bcrypt.compare(password, user.password);

    if (!isPassEquals) {
      throw ApiError.BadRequest('User not found');
    }

    const userDto = new UserModel({
      ...user.toObject(),
      _id: user._id.toString(),
    });

    const tokens = tokenService.generateTokens({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens }
  }

  async logout(refreshToken: any) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken: any) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }
    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.findToken(refreshToken);
    if (!userData || !tokenFromDb) {
      throw ApiError.UnauthorizedError();
    }

    // @ts-ignore
    const user = await UserSchema.findById(userData.id);

    if (!user) {
      throw new Error('User not found');
    }

    const userDto = new UserModel({
      ...user.toObject(),
      _id: user._id.toString(),
    });
    const tokens = tokenService.generateTokens({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens }
  }
}

export const authService = new AuthService();
