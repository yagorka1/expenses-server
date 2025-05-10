import { CurrencyInterface } from '../../interfaces/currency/currency-interface';

export class CurrencyModel implements CurrencyInterface {
  public id: string;
  public code: string;
  public name: string;

  constructor(data: CurrencyInterface) {
    this.id = data.id;
    this.code = data.code;
    this.name = data.name;
  }
}
