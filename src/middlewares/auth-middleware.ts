import { tokenService } from '../service/token-service';
import { ApiError } from '../exceptions/api-error';
import { Roles } from '../enums/roles';
import { UserModel } from '../models/user/user-model';

export const authMiddleware = (req: any, res: any, next: any) => {
  try {
    const authorizationHeader = req.headers.authorization;

    if (authorizationHeader === `Bearer ${process.env.BOT_TOKEN}`) {
      req.user = { id: 'telegram-bot' };
      return next();
    }

    if (!authorizationHeader) {
      return next(ApiError.UnauthorizedError());
    }

    const accessToken = authorizationHeader.split(' ')[1];
    if (!accessToken) {
      return next(ApiError.UnauthorizedError());
    }

    // @ts-ignore
    const userData: UserModel = tokenService.validateAccessToken(accessToken);

    if (userData?.role !== Roles.Admin) {
      return next(ApiError.UnauthorizedError());
    }

    req.user = userData;
    next();
  } catch (e) {
    return next(ApiError.UnauthorizedError());
  }
};
