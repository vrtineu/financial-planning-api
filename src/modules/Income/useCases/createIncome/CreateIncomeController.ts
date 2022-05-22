import { Request, Response } from 'express';

import { CreateIncomeUseCase } from './CreateIncomeUseCase';

class CreateIncomeController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { date, description, value } = request.body;
    const { userId } = request.user;

    const createIncomeUseCase = new CreateIncomeUseCase();

    const income = await createIncomeUseCase.execute({
      date,
      description,
      value,
      userId,
    });

    return response.json(income);
  }
}

export { CreateIncomeController };
