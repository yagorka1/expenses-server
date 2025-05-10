import {CurrencySchema} from '../models/db/currency-schema';
import {CurrencyModel} from '../models/currency/currency-model';
import {CurrencySchemaInterface} from '../interfaces/currency/currency-schema-interface';
import axios from 'axios';
import {CurrencyRateModel} from '../models/currency/currency-rate-model';
import {ApiError} from '../exceptions/api-error';
import {DEFAULT_CURRENCY_CODE} from '../config/currencies';

class CurrenciesService {
  async getCurrenciesList(): Promise<CurrencyModel[]> {
    const currencies = await CurrencySchema.find();

    return currencies.map((c) => new CurrencyModel({ ...c.toObject(), id: c._id.toString() }));
  }

  async getCurrencyByCode(code: string): Promise<CurrencyModel> {
    const currency = await CurrencySchema.findOne({code});

    if (!currency) {
      throw ApiError.BadRequest('Currency not found');
    }

    return new CurrencyModel(currency);
  }

  async getCurrencyRatesDynamic(currencyCode: string, startDate: string, endDate: string): Promise<CurrencyRateModel[]> {
    const currencies: CurrencyModel[] = await this.getCurrenciesList();

    const url: string = `https://www.nbrb.by/API/ExRates/Rates/Dynamics/${currencyCode}?startDate=${startDate}&endDate=${endDate}`;

    const currencyRate = await axios.get(url).then((response) => {
      return response.data;
    });

    const currenciesRates: CurrencyRateModel[] = [];

    currencies.forEach((currency) => {
      currencyRate.forEach((rate: any) => {

        if (String(rate.Cur_ID) === String(currency.id)) {
          currenciesRates.push(new CurrencyRateModel({
            currency: currency,
            date: rate?.Date,
            rate: rate?.Cur_OfficialRate,
          }));
        }
      })
    });

    return currenciesRates;
  }

  async getCurrencyRates(date: string): Promise<CurrencyRateModel[]> {
    const currencies: CurrencyModel[] = await this.getCurrenciesList();

    const url: string = `https://www.nbrb.by/api/exrates/rates?ondate=${date}&periodicity=0`;

    const currencyRate = await axios.get(url).then((response) => {
      return response.data;
    });

    const currenciesRates: CurrencyRateModel[] = [];


    currencies.forEach((currency) => {
      currencyRate.forEach((rate: any) => {
        if (rate.Cur_Abbreviation === currency.code) {
          currenciesRates.push(new CurrencyRateModel({
            currency: currency,
            date: rate?.Date,
            rate: rate?.Cur_OfficialRate,
          }));
        }
      })
    });

    return currenciesRates;
  }

  async getCurrencyRateForPair(currencyCodeFrom: string, currencyCodeTo: string, date: Date): Promise<{ rate: number, date: Date }> {
    const currencyFrom: CurrencyModel = await this.getCurrencyByCode(currencyCodeFrom);
    const currencyTo: CurrencyModel = await this.getCurrencyByCode(currencyCodeTo);

    if (currencyFrom.code === currencyTo.code) {
      return {
        rate: 1,
        date: new Date(),
      };
    }

    if (currencyFrom.code === DEFAULT_CURRENCY_CODE) {
      const currencyRate: CurrencyRateModel = await CurrenciesService.requestCurrencyRate(currencyTo, date);

      return {
        rate: 1 / currencyRate.rate,
        date: new Date(),
      };

    }

    if (currencyTo.code === DEFAULT_CURRENCY_CODE) {
      const currencyRate: CurrencyRateModel = await CurrenciesService.requestCurrencyRate(currencyFrom, date);

      return {
        rate: currencyRate.rate,
        date: new Date(),
      };
    }

    if (currencyTo.code !== DEFAULT_CURRENCY_CODE && currencyTo.code !== DEFAULT_CURRENCY_CODE) {
      const currencyRateTo: CurrencyRateModel = await CurrenciesService.requestCurrencyRate(currencyTo, date);
      const currencyRateFrom: CurrencyRateModel = await CurrenciesService.requestCurrencyRate(currencyFrom, date);

      return {
        rate: currencyRateFrom.rate / currencyRateTo.rate,
        date: new Date(),
      };
    }

    return {
      rate: 0,
      date: new Date(),
    };
  }

  private static async requestCurrencyRate(currency: CurrencyModel, date: Date) {
    const url: string = `https://www.nbrb.by/api/exrates/rates/${currency.code}?parammode=2&ondate=${date}`;

    return await axios.get(url).then((response) => {
      return new CurrencyRateModel({
        currency,
        date: response.data?.Date,
        rate: response.data?.Cur_OfficialRate,
      });
    });
  }
}

export const currencyService = new CurrenciesService();
