import { Router } from 'express';

import { SummaryController } from '../controllers/SummaryController';

const summaryRoutes = Router();
const summaryController = new SummaryController();

summaryRoutes.get('/:year/:month', summaryController.getResumoByYearAndMonth);

export { summaryRoutes };
