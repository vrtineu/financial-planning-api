import { Request, Response } from 'express';

import { GetIncomeUseCase } from './GetIncomeUseCase';

class GetIncomeController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const id = Number(request.params.id);

    const getIncomeUseCase = new GetIncomeUseCase();

    const income = await getIncomeUseCase.execute(id);

    return response.json(income);
  }
}

export { GetIncomeController };
