import { Router } from 'express';

import { bodyFields, validate } from '@middlewares/validation';
import { CreateIncomeController } from '@modules/Income/useCases/createIncome/CreateIncomeController';
import { DeleteIncomeController } from '@modules/Income/useCases/deleteIncome/DeleteIncomeController';
import { GetIncomeController } from '@modules/Income/useCases/getIncome/GetIncomeController';
import { GetIncomesController } from '@modules/Income/useCases/getIncomes/GetIncomesController';
import { GetIncomesByDateController } from '@modules/Income/useCases/getIncomesByDate/GetIncomesByDateController';
import { UpdateIncomeController } from '@modules/Income/useCases/updateIncome/UpdateIncomeController';

const incomesRoutes = Router();

const createIncomeController = new CreateIncomeController();
const getIncomeController = new GetIncomeController();
const getIncomesController = new GetIncomesController();
const getIncomesByDateController = new GetIncomesByDateController();
const updateIncomeController = new UpdateIncomeController();
const deleteIncomeController = new DeleteIncomeController();

incomesRoutes.post('/', bodyFields, validate, createIncomeController.handle);
incomesRoutes.get('/', getIncomesController.handle);
incomesRoutes.get('/:id', getIncomeController.handle);
incomesRoutes.get('/:year/:month', getIncomesByDateController.handle);
incomesRoutes.put('/:id', bodyFields, validate, updateIncomeController.handle);
incomesRoutes.delete('/:id', deleteIncomeController.handle);

export { incomesRoutes };
