import { UserModel } from '../user/user-model';
import { CurrencyModel } from '../currency/currency-model';
import { UserProfileInterface } from '../../interfaces/user-profile/user-profile-interface';

export class UserProfileModel implements UserProfileInterface {
  public user: UserModel;
  public defaultCurrency: CurrencyModel;

  constructor(data: any) {
    this.user = data.user;
    this.defaultCurrency = data.defaultCurrency;
  }
}
