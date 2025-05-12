import { RateInterface } from '../interfaces/rates/rate.interface';
import {
  BYN_CURRENCY_CODE, BYN_TO_EUR_RATE,
  EUR_CURRENCY_CODE,
  PLN_CURRENCY_CODE,
  RSD_CURRENCY_CODE, RSD_TO_EUR_RATE,
  USD_CURRENCY_CODE
} from '../config/currencies';

export const amountInDifferentCurrenciesHelper = (transactionAmount: number, transactionCurrency: string, rates: RateInterface) => {
  const BYN_RATE: number = BYN_TO_EUR_RATE * getRate(transactionCurrency, EUR_CURRENCY_CODE, rates);
  const RSD_RATE: number = RSD_TO_EUR_RATE * getRate(transactionCurrency, EUR_CURRENCY_CODE, rates);

  return {
    [EUR_CURRENCY_CODE]: getAmount(transactionAmount, transactionCurrency, EUR_CURRENCY_CODE, getRate(transactionCurrency, EUR_CURRENCY_CODE, rates)),
    [USD_CURRENCY_CODE]: getAmount(transactionAmount, transactionCurrency, USD_CURRENCY_CODE, getRate(transactionCurrency, USD_CURRENCY_CODE, rates)),
    [PLN_CURRENCY_CODE]: getAmount(transactionAmount, transactionCurrency, PLN_CURRENCY_CODE, getRate(transactionCurrency, PLN_CURRENCY_CODE, rates)),
    [BYN_CURRENCY_CODE]: getAmount(transactionAmount, transactionCurrency, BYN_CURRENCY_CODE, BYN_RATE),
    [RSD_CURRENCY_CODE]: getAmount(transactionAmount, transactionCurrency, RSD_CURRENCY_CODE, RSD_RATE),
  }
}


const getAmount = (transactionAmount: number, transactionCurrency: string, currencyBase: string, rate: number) => {
  if (transactionCurrency === currencyBase) {
    return Math.round(transactionAmount * 100) / 100;
  }

  if (transactionCurrency === USD_CURRENCY_CODE || transactionCurrency === EUR_CURRENCY_CODE || transactionCurrency === PLN_CURRENCY_CODE) {
    return Math.round(transactionAmount * rate * 100) / 100;
  }

  return Math.round(transactionAmount * rate * 100) / 100;
}

const getRate = (transactionCurrency: string, currencyBase: string, rates: RateInterface): number => {
  if (transactionCurrency === currencyBase) {
    return 1;
  }

  if (transactionCurrency === USD_CURRENCY_CODE || transactionCurrency === EUR_CURRENCY_CODE || transactionCurrency === PLN_CURRENCY_CODE) {
    return rates?.rates[currencyBase];
  }

  return 1;
}
