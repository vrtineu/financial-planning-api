import { Router } from 'express';
import { check } from 'express-validator';

import { ExpensesController } from '../controllers/ExpensesController';
import { validate, bodyFields } from '../middlewares/validation';

const expensesRoutes = Router();
const expensesController = new ExpensesController();

expensesRoutes.post(
  '/',
  [...bodyFields, check('categoria', 'Categoria must be string').isString()],
  validate,
  expensesController.createDespesa
);

expensesRoutes.get('/', expensesController.getDespesas);
expensesRoutes.get('/:id', expensesController.getDespesa);
expensesRoutes.get(
  '/:year/:month',
  expensesController.getDespesasByYearAndMonth
);

expensesRoutes.put(
  '/:id',
  [...bodyFields, check('categoria', 'Categoria must be string').isString()],
  validate,
  expensesController.updateDespesa
);

expensesRoutes.delete('/:id', expensesController.deleteDespesa);

export { expensesRoutes };
