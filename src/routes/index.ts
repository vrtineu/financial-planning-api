import { Router } from 'express';

import { authMiddleware } from '../middlewares';
import { expensesRoutes } from './expenses.routes';
import { incomesRoutes } from './incomes.routes';
import { summaryRoutes } from './summary.routes';
import { userRoutes } from './users.routes';

const router = Router();

router.use(authMiddleware);

router.use('/receitas', incomesRoutes);
router.use('/despesas', expensesRoutes);
router.use('/resumo', summaryRoutes);
router.use('/', userRoutes);

export { router };
