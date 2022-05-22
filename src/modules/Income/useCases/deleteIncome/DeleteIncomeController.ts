import { Request, Response } from 'express';

import { DeleteIncomeUseCase } from './DeleteIncomeUseCase';

class DeleteIncomeController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { userId } = request.user;

    const deleteIncomeUseCase = new DeleteIncomeUseCase();

    const result = await deleteIncomeUseCase.execute(Number(id), userId);

    return response.status(204).json(result);
  }
}

export { DeleteIncomeController };
