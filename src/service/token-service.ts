import * as jwt from 'jsonwebtoken';
import { TokenSchema } from '../models/db/token-schema';

class TokenService {
  public generateTokens(payload: any) {
    const accessToken = jwt.sign(payload, 'jwt-secret-key', { expiresIn: '1000000s' });
    const refreshToken = jwt.sign(payload, 'jwt-refresh-secret-key', { expiresIn: '10000000s' });
    return {
      accessToken,
      refreshToken
    }
  }

  public validateAccessToken(token: any) {
    try {
      return jwt.verify(token, 'jwt-secret-key');
    } catch (e) {
      return null;
    }
  }

  public validateRefreshToken(token: any) {
    try {
      return jwt.verify(token, 'jwt-refresh-secret-key');
    } catch (e) {
      return null;
    }
  }

  public async saveToken(userId: any, refreshToken: any) {
    const tokenData = await TokenSchema.findOne({ user: userId });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }
    const token = await TokenSchema.create({ user: userId, refreshToken });
    return token;
  }

  public async removeToken(refreshToken: any) {
    const tokenData = await TokenSchema.deleteOne({ refreshToken });
    return tokenData;
  }

  public  async findToken(refreshToken: any) {
    const tokenData = await TokenSchema.findOne({ refreshToken });
    return tokenData;
  }
}

export const tokenService = new TokenService();
