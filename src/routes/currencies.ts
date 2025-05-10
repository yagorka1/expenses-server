import { Router } from 'express';
import { currenciesController } from '../controllers/currencies-controller';

const router = Router();

router.get('/rates', currenciesController.getCurrenciesRates);
router.get('/rateForPair', currenciesController.getCurrenciesRateForPair);
router.get('/list', currenciesController.getCurrenciesList);
router.get('/rateDynamic', currenciesController.getCurrencyRateDynamic);

export const currenciesRouter = router;
