import { currencyService } from '../service/currencies-service';
import moment from "moment";

class CurrenciesController {
  // async getCurrenciesRates(req: any, res: any, next: any) {
  //   try {
  //     const date = req.query?.date;
  //
  //     const currencies = await currencyService.getCurrencyRates(date);
  //     return res.json(currencies);
  //   } catch (e) {
  //     next(e);
  //   }
  // }
  //
  // async getCurrenciesRateForPair(req: any, res: any, next: any) {
  //   try {
  //     const date = req.query?.date ? req.query?.date : moment(new Date()).format('YYYY-MM-DD');
  //     const rate: { rate: number, date: Date } = await currencyService.getCurrencyRateForPair(req.query.currencyCodeFrom, req.query.currencyCodeTo, date);
  //     return res.json(rate);
  //   } catch (e) {
  //     next(e);
  //   }
  // }

  async getCurrenciesList(req: any, res: any, next: any) {
    try {
      const currencies = await currencyService.getCurrenciesList();
      return res.json({ data: currencies });
    } catch (e) {
      next(e);
    }
  }

  async getCurrenciesRateByBase(req: any, res: any, next: any) {
    try {
      const currencies = await currencyService.getCurrenciesRateByBase(req.query?.base);
      return res.json({ data: currencies });
    } catch (e) {
      next(e);
    }
  }

  async getAllAmountCurrencies(req: any, res: any, next: any) {

  }

  // async getCurrencyRateDynamic(req: any, res: any, next: any) {
  //   try {
  //     const startDate = req.query?.startDate;
  //     const endDate = req.query?.endDate;
  //     const code = req.query?.code;
  //     const currencies = await currencyService.getCurrencyRatesDynamic(code, startDate, endDate);
  //     return res.json({ data: currencies });
  //   } catch (e) {
  //     next(e);
  //   }
  // }
}

export const currenciesController = new CurrenciesController();
