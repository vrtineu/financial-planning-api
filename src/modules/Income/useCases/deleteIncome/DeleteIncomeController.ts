import { Request, Response } from 'express';

import { DeleteIncomeUseCase } from './DeleteIncomeUseCase';

class DeleteIncomeController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const id = Number(request.params.id);

    const deleteIncomeUseCase = new DeleteIncomeUseCase();

    const result = await deleteIncomeUseCase.execute(id);

    return response.json(result);
  }
}

export { DeleteIncomeController };
