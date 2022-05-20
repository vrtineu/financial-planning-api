import { Request, Response } from 'express';

import { GetExpenseUseCase } from './GetExpenseUseCase';

class GetExpenseController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { userId } = request.user;
    const { expenseId } = request.params;

    const getExpenseUseCase = new GetExpenseUseCase();

    const expense = await getExpenseUseCase.execute(Number(expenseId), userId);

    return response.json(expense);
  }
}

export { GetExpenseController };
