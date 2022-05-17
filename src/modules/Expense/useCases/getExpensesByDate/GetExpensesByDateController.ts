import { Request, Response } from 'express';

import { GetExpensesByDateUseCase } from './GetExpensesByDateUseCase';

class GetExpensesByDateController {
  public async handle(request: Request, response: Response) {
    const { year, month } = request.params;

    const getExpensesByDateUseCase = new GetExpensesByDateUseCase();

    const expenses = await getExpensesByDateUseCase.execute(
      Number(year),
      Number(month)
    );

    return response.status(200).json(expenses);
  }
}

export { GetExpensesByDateController };
