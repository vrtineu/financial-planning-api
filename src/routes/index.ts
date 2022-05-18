import { Router } from 'express';

import { ensureAuthenticated } from '@middlewares/ensureAuthenticated';

import { expensesRoutes } from './expenses.routes';
import { incomesRoutes } from './incomes.routes';
import { summaryRoutes } from './summary.routes';
import { userRoutes } from './users.routes';

const router = Router();

router.use(ensureAuthenticated);

router.use('/incomes', incomesRoutes);
router.use('/expenses', expensesRoutes);
router.use('/summary', summaryRoutes);
router.use('/users', userRoutes);

export { router };
