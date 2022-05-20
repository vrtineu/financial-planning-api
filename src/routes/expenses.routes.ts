import { Router } from 'express';
import { check } from 'express-validator';

import { bodyFields, validate } from '@middlewares/validation';
import { CreateExpenseController } from '@modules/Expense/useCases/createExpense/CreateExpenseController';
import { DeleteExpenseController } from '@modules/Expense/useCases/deleteExpense/DeleteExpenseController';
import { GetExpenseController } from '@modules/Expense/useCases/getExpense/GetExpenseController';
import { GetExpensesController } from '@modules/Expense/useCases/getExpenses/GetExpensesController';
import { GetExpensesByDateController } from '@modules/Expense/useCases/getExpensesByDate/GetExpensesByDateController';
import { UpdateExpenseController } from '@modules/Expense/useCases/updateExpense/UpdateExpenseController';

const expensesRoutes = Router();

const createExpenseController = new CreateExpenseController();
const getExpenseController = new GetExpenseController();
const getExpensesController = new GetExpensesController();
const getExpensesByDateController = new GetExpensesByDateController();
const updateExpenseController = new UpdateExpenseController();
const deleteExpenseController = new DeleteExpenseController();

expensesRoutes.get('/', getExpensesController.handle);
expensesRoutes.get('/:expenseId', getExpenseController.handle);
expensesRoutes.get('/:year/:month', getExpensesByDateController.handle);
expensesRoutes.delete('/:expenseId', deleteExpenseController.handle);

const bodyValidation = [
  ...bodyFields,
  check('category', 'category must be string').isString(),
];

expensesRoutes.post(
  '/',
  bodyValidation,
  validate,
  createExpenseController.handle
);

expensesRoutes.put(
  '/:id',
  bodyValidation,
  validate,
  updateExpenseController.handle
);

export { expensesRoutes };
