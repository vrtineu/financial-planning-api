import { Request, Response } from 'express';

import { GetExpensesUseCase } from './GetExpensesUseCase';

class GetExpensesController {
  public async handle(request: Request, response: Response) {
    const { description } = request.query as { description: string };

    const getExpensesUseCase = new GetExpensesUseCase();

    const expenses = await getExpensesUseCase.execute({ description });

    return response.json(expenses);
  }
}

export { GetExpensesController };
