import { Request, Response } from 'express';

import { UpdateIncomeUseCase } from './UpdateIncomeUseCase';

class UpdateIncomeController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { date, description, value } = request.body;
    const { userId } = request.user;

    const updateIncomeUseCase = new UpdateIncomeUseCase();

    const result = await updateIncomeUseCase.execute({
      id: Number(id),
      date,
      description,
      value,
      userId,
    });

    return response.json(result);
  }
}

export { UpdateIncomeController };
