import { Request, Response } from 'express';

import { UpdateIncomeUseCase } from './UpdateIncomeUseCase';

class UpdateIncomeController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const id = Number(request.params.id);
    const { date, description, value } = request.body;

    const updateIncomeUseCase = new UpdateIncomeUseCase();

    const result = await updateIncomeUseCase.execute({
      id,
      date,
      description,
      value,
    });

    return response.json(result);
  }
}

export { UpdateIncomeController };
