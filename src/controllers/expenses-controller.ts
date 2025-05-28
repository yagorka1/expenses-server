import { expensesService } from '../service/expenses-service';
import { ExpenseModel } from '../models/expense/expense-model';
import { UserModel } from '../models/user/user-model';
import { CreateExpenseInterface } from '../interfaces/expense/create-expense-interface';

class ExpensesController {
  async getExpenses(req: any, res: any, next: any) {
    try {
      const expenses: ExpenseModel[] = await expensesService.getExpensesList() || [];
      return res.json({ data: expenses });
    } catch (e) {
      next(e);
    }
  }

  async getExpenseById(req: any, res: any, next: any) {
    try {
      const expense: ExpenseModel = await expensesService.getExpenseById(req.params.id);
      return res.json({ data: expense });
    } catch (e) {
      next(e);
    }
  }

  async createExpense(req: { body: CreateExpenseInterface, user: UserModel }, res: any, next: any) {
    try {
      const expenseModel: ExpenseModel = await expensesService.createExpense(req.body);

      return res.json({ data: expenseModel });
    } catch (e) {
      next(e);
    }
  }

  async getExpensesStatistics(req: any, res: any, next: any) {
    try {
      const { type } = req.query;
      const data: any = await expensesService.getStatistics(type);
      return res.json({ data });
    } catch (e) {
      next(e);
    }
  }
}

export const expensesController: ExpensesController = new ExpensesController();
