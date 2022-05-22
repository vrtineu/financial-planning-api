import { Request, Response } from 'express';

import { GetIncomeUseCase } from './GetIncomeUseCase';

class GetIncomeController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { userId } = request.user;

    const getIncomeUseCase = new GetIncomeUseCase();

    const income = await getIncomeUseCase.execute(Number(id), userId);

    return response.json(income);
  }
}

export { GetIncomeController };
