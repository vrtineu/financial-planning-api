import { Request, Response } from 'express';

import { CreateIncomeUseCase } from './CreateIncomeUseCase';

class CreateIncomeController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { date, description, value } = request.body;
    const id = Number(request.params.id);

    const createIncomeUseCase = new CreateIncomeUseCase();

    const result = await createIncomeUseCase.execute({
      date,
      description,
      value,
      id,
    });

    return response.status(200).json(result);
  }
}

export { CreateIncomeController };
