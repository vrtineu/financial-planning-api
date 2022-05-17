import { Request, Response } from 'express';

import { GetIncomesByDateUseCase } from './GetIncomesByDateUseCase';

class GetIncomesByDateController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { year, month } = request.params;

    const getIncomesByDateUseCase = new GetIncomesByDateUseCase();

    const result = await getIncomesByDateUseCase.execute(
      Number(year),
      Number(month)
    );

    return response.json(result);
  }
}

export { GetIncomesByDateController };
