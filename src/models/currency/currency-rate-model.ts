import { CurrencyModel } from './currency-model';
import { CurrencyRateInterface } from '../../interfaces/currency/currency-rate-interface';
import { CurrencyInterface } from '../../interfaces/currency/currency-interface';

export class CurrencyRateModel implements CurrencyRateInterface {
  public currency: CurrencyInterface;
  public date: string;
  public rate: number;

  constructor(data: CurrencyRateInterface) {
    this.currency = new CurrencyModel(data.currency);
    this.date = data.date;
    this.rate = data.rate;
  }
}
