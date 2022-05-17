import { Request, Response } from 'express';

import { GetExpenseUseCase } from './GetExpenseUseCase';

class GetExpenseController {
  public async handle(request: Request, response: Response) {
    const id = Number(request.params.id);

    const getExpenseUseCase = new GetExpenseUseCase();

    const expense = await getExpenseUseCase.execute(id);

    return response.json(expense);
  }
}

export { GetExpenseController };
