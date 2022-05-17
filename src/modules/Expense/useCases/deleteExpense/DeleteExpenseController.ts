import { Request, Response } from 'express';

import { DeleteExpenseUseCase } from './DeleteExpenseUseCase';

class DeleteExpenseController {
  public async handle(request: Request, response: Response) {
    const id = Number(request.params.id);

    const deleteExpenseUseCase = new DeleteExpenseUseCase();

    const result = await deleteExpenseUseCase.execute(id);

    return response.status(200).json(result);
  }
}

export { DeleteExpenseController };
