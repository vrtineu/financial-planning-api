import { Request, Response } from 'express';

import { DeleteExpenseUseCase } from './DeleteExpenseUseCase';

class DeleteExpenseController {
  public async handle(request: Request, response: Response) {
    const { userId } = request.user;
    const { expenseId } = request.params;

    const deleteExpenseUseCase = new DeleteExpenseUseCase();

    const result = await deleteExpenseUseCase.execute(
      Number(expenseId),
      userId
    );

    return response.status(204).json(result);
  }
}

export { DeleteExpenseController };
