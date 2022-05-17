import { Router } from 'express';

import { GetSummaryByDateController } from '@modules/Summary/useCases/getSummaryByDate/GetSummaryByDateController';

const summaryRoutes = Router();

const getSummaryByDateController = new GetSummaryByDateController();

summaryRoutes.get('/:year/:month', getSummaryByDateController.handle);

export { summaryRoutes };
