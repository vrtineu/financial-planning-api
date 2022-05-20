import { Request, Response } from 'express';

import { GetExpensesByDateUseCase } from './GetExpensesByDateUseCase';

class GetExpensesByDateController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { year, month } = request.params;
    const { userId } = request.user;

    const getExpensesByDateUseCase = new GetExpensesByDateUseCase();

    const expenses = await getExpensesByDateUseCase.execute({
      year: Number(year),
      month: Number(month),
      userId,
    });

    return response.json(expenses);
  }
}

export { GetExpensesByDateController };
