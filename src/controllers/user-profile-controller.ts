import { userProfileService } from '../service/user-profile-service';
import { UserModel } from '../models/user/user-model';
import { CurrencyModel } from '../models/currency/currency-model';
import { currencyService } from '../service/currencies-service';
import { UserProfileModel } from '../models/user-profile/user-profile-model';

class UserProfileController {
  async getUsers(req: any, res: any, next: any) {
    try {
      const users = await userProfileService.getAllUsers();
      return res.json(users);
    } catch (e) {
      next(e);
    }
  }

  async getProfile(req: any, res: any, next: any) {
    try {
      const user: UserModel = await userProfileService.getUserDataById(req.user.email);

      // const currency: CurrencyModel = await currencyService.getCurrencyByCode(user.defaultCurrencyCode);

      const profile = new UserProfileModel({
        user: user,
        defaultCurrency: 'USD',
      });

      return res.json({ data: profile });
    } catch (e) {
      next(e);
    }
  }
}

export const userProfileController = new UserProfileController();
