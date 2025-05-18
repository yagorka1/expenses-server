import { Router } from 'express';
import { expensesController } from '../controllers/expenses-controller';

const router = Router();

router.get('/list', expensesController.getExpenses);
router.post('/create', expensesController.createExpense);
router.get('/:id', expensesController.getExpenseById);

export const expensesRouter = router;
