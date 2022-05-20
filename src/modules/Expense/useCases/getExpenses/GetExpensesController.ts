import { Request, Response } from 'express';

import { GetExpensesUseCase } from './GetExpensesUseCase';

class GetExpensesController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { userId } = request.user;
    const { description } = request.query as { description: string };

    const getExpensesUseCase = new GetExpensesUseCase();

    const expenses = await getExpensesUseCase.execute(description, userId);

    return response.json(expenses);
  }
}

export { GetExpensesController };
