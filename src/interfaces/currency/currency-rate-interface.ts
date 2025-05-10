import { CurrencyInterface } from './currency-interface';

export interface CurrencyRateInterface {
  currency: CurrencyInterface;
  date: string;
  rate: number;
}
