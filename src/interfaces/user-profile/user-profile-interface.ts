import { UserInterface } from '../user/user-interface';
import { CurrencyInterface } from '../currency/currency-interface';

export interface UserProfileInterface {
  user: UserInterface;
  defaultCurrency: CurrencyInterface;
}
