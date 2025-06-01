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
import { StatisticsTimeEnum } from '../enums/statistics-time.enum';

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

  async getStatistics(type: StatisticsTimeEnum = StatisticsTimeEnum.WEEK): Promise<any> {
    try {
      const now = new Date();

      let firstDay;
      let lastDay;

      let prevFirstDay;
      let prevLastDay;

      if (type === StatisticsTimeEnum.WEEK) {
        const dayOfWeek = now.getDay();
        const diffToMonday = (dayOfWeek + 6) % 7;
        const mondayThisWeek = new Date(now);
        mondayThisWeek.setDate(now.getDate() - diffToMonday);

        firstDay = new Date(mondayThisWeek);
        firstDay.setDate(mondayThisWeek.getDate() - 7);
        prevFirstDay = new Date(mondayThisWeek);
        prevFirstDay.setDate(mondayThisWeek.getDate() - 14);

        lastDay = new Date(mondayThisWeek);
        lastDay.setDate(mondayThisWeek.getDate() - 1);
        prevLastDay = new Date(mondayThisWeek);
        prevLastDay.setDate(mondayThisWeek.getDate() - 8);

        firstDay.setHours(0, 0, 0, 0);
        lastDay.setHours(23, 59, 59, 999);
        prevFirstDay.setHours(0, 0, 0, 0);
        prevLastDay.setHours(23, 59, 59, 999);
      }

      if (type === StatisticsTimeEnum.MONTH) {
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();

        firstDay = new Date(currentYear, currentMonth - 1, 1);
        lastDay = new Date(currentYear, currentMonth, 0);

        prevFirstDay = new Date(currentYear, currentMonth - 2, 1);
        prevLastDay = new Date(currentYear, currentMonth - 1, 0);

        firstDay.setHours(0, 0, 0, 0);
        lastDay.setHours(23, 59, 59, 999);
        prevFirstDay.setHours(0, 0, 0, 0);
        prevLastDay.setHours(23, 59, 59, 999);
      }

      const expenses: ExpenseSchemaInterface[] = await ExpenseSchema.find({
        date: { $gte: firstDay, $lte: lastDay },
      });

      const prevExpenses: ExpenseSchemaInterface[] = await ExpenseSchema.find({
        date: { $gte: prevFirstDay, $lte: prevLastDay },
      });

      const totalAmountInEUR: number = expenses.reduce((acc: number, expense: ExpenseSchemaInterface) => acc + expense?.amounts[EUR_CURRENCY_CODE], 0);
      const totalAmountInRSD: number = expenses.reduce((acc: number, expense: ExpenseSchemaInterface) => acc + expense?.amounts[RSD_CURRENCY_CODE], 0);

      const prevTotalAmountInEUR: number = prevExpenses.reduce((acc: number, expense: ExpenseSchemaInterface) => acc + expense?.amounts[EUR_CURRENCY_CODE], 0);
      const prevTotalAmountInRSD: number = prevExpenses.reduce((acc: number, expense: ExpenseSchemaInterface) => acc + expense?.amounts[RSD_CURRENCY_CODE], 0);

      const rawExpensesByCategory = expenses.reduce(
        (acc: { [category: string]: { EUR: number; RSD: number } }, expense) => {
          const category = expense.categoryName;
          const amountInEUR = expense?.amounts[EUR_CURRENCY_CODE] || 0;
          const amountInRSD = expense?.amounts[RSD_CURRENCY_CODE] || 0;

          if (!acc[category]) {
            acc[category] = { EUR: 0, RSD: 0 };
          }

          acc[category].EUR += amountInEUR;
          acc[category].RSD += amountInRSD;

          return acc;
        },
        {}
      );


      const rawExpensesBySubcategory = expenses.reduce(
        (acc: { [category: string]: { EUR: number; RSD: number } }, expense) => {
          const subcategory = expense.subcategoryName;
          const amountInEUR = expense?.amounts[EUR_CURRENCY_CODE] || 0;
          const amountInRSD = expense?.amounts[RSD_CURRENCY_CODE] || 0;

          if (!acc[subcategory]) {
            acc[subcategory] = { EUR: 0, RSD: 0 };
          }

          acc[subcategory].EUR += amountInEUR;
          acc[subcategory].RSD += amountInRSD;

          return acc;
        },
        {}
      );

      const sortedExpensesByCategory = Object.entries(rawExpensesByCategory)
        .sort(([, a], [, b]) => b.EUR - a.EUR)
        .map(([category, amounts]) => ({ category, amounts }));

      const sortedExpensesBySubcategory = Object.entries(rawExpensesBySubcategory)
        .sort(([, a], [, b]) => b.EUR - a.EUR)
        .map(([subcategory, amounts]) => ({ subcategory, amounts }));

      const expensesByPerson = expenses.reduce(
        (acc: { [person: string]: { EUR: number; RSD: number } }, expense) => {
          const person = expense.person;
          const amountInEUR = expense?.amounts[EUR_CURRENCY_CODE] || 0;
          const amountInRSD = expense?.amounts[RSD_CURRENCY_CODE] || 0;

          if (!acc[person]) {
            acc[person] = { EUR: 0, RSD: 0 };
          }

          acc[person].EUR += amountInEUR;
          acc[person].RSD += amountInRSD;

          return acc;
        },
        {}
      );

      return {
        totalAmountInEUR,
        totalAmountInRSD,
        sortedExpensesByCategory,
        sortedExpensesBySubcategory,
        expensesByPerson,
        prevTotalAmountInEUR,
        prevTotalAmountInRSD
      };
    } finally {
    }
  }
}

export const expensesService: ExpensesService = new ExpensesService();
