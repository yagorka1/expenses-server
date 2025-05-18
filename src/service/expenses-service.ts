import { ExpenseModel } from '../models/expense/expense-model';
import { ExpenseSchema } from '../models/db/expense-schema';
import { ExpenseSchemaInterface } from '../interfaces/expense/expense-schema-interface';
import { currencyService } from './currencies-service';
import { CreateExpenseInterface } from '../interfaces/expense/create-expense-interface';
import { amountInDifferentCurrenciesHelper } from '../helpers/amount-in-different-currencies.helper';
import { RateInterface } from '../interfaces/rates/rate.interface';
import {
  BYN_CURRENCY_CODE, BYN_TO_EUR_RATE,
  EUR_CURRENCY_CODE,
  RSD_CURRENCY_CODE, RSD_TO_EUR_RATE,
} from '../config/currencies';
import { ApiError } from '../exceptions/api-error';

class ExpensesService {
  async getExpensesList(): Promise<ExpenseModel[]> {
    try {
      const expenses: ExpenseSchemaInterface[] = await ExpenseSchema.find().sort({ date: -1 });
      return expenses.map((category: ExpenseSchemaInterface) => new ExpenseModel(category)) || [];
    } finally {

    }
  }

  async getExpenseById(id: string): Promise<ExpenseModel> {
    try {
      const expense: ExpenseSchemaInterface | null = await ExpenseSchema.findOne({ _id: id });
      if (!expense) {
        throw ApiError.BadRequest('Expense not found');
      }
      return new ExpenseModel(expense);
    } finally {
    }
  }

  private getBaseCurrencyCode(currency: string): string {
    if (currency === RSD_CURRENCY_CODE || currency === BYN_CURRENCY_CODE) {
      return EUR_CURRENCY_CODE;
    }

    return currency;
  }

  async createExpense(expense: CreateExpenseInterface): Promise<ExpenseModel> {
    try {
      let currency: string;
      let amount: number;
      let rates: RateInterface;

      if (expense.currency === RSD_CURRENCY_CODE || expense.currency === BYN_CURRENCY_CODE) {
        amount = expense.currency === RSD_CURRENCY_CODE ? expense.amount / RSD_TO_EUR_RATE : expense.amount / BYN_TO_EUR_RATE;
        currency = EUR_CURRENCY_CODE;
        rates = await currencyService.getCurrenciesRateByBase(this.getBaseCurrencyCode(EUR_CURRENCY_CODE));

      } else {
        currency = expense.currency;
        amount = expense.amount;
        rates = await currencyService.getCurrenciesRateByBase(this.getBaseCurrencyCode(currency));
      }

      const amounts: { [key: string]: number } = amountInDifferentCurrenciesHelper(amount, currency, rates);

      const expenseSchema = await ExpenseSchema.create({ ...expense, amounts });

      return new ExpenseModel(expenseSchema.toObject() as ExpenseSchemaInterface);
    } catch (error) {
      console.error('❌ Failed to create expense:', error);

      throw new Error('Не удалось создать трату. Попробуйте позже.');
    }
  }
}

export const expensesService: ExpensesService = new ExpensesService();
