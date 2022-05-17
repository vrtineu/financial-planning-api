import { Router } from 'express';

import IncomesController from '../controllers/IncomesController';
import { validate, bodyFields } from '../middlewares/validation';

const incomesRoutes = Router();
const receitasController = new IncomesController();

incomesRoutes.post('/', bodyFields, validate, receitasController.createReceita);

incomesRoutes.get('/', receitasController.getReceitas);
incomesRoutes.get('/:id', receitasController.getReceita);
incomesRoutes.get(
  '/:year/:month',
  receitasController.getReceitasByYearAndMonth
);

incomesRoutes.put(
  '/:id',
  bodyFields,
  validate,
  receitasController.updateReceita
);

incomesRoutes.delete('/:id', receitasController.deleteReceita);

export { incomesRoutes };
