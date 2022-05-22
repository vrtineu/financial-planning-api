import { Request, Response } from 'express';

import { GetIncomesByDateUseCase } from './GetIncomesByDateUseCase';

class GetIncomesByDateController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { year, month } = request.params;
    const { userId } = request.user;

    const getIncomesByDateUseCase = new GetIncomesByDateUseCase();

    const incomes = await getIncomesByDateUseCase.execute(
      Number(year),
      Number(month),
      userId
    );

    return response.json(incomes);
  }
}

export { GetIncomesByDateController };
