import { Request, Response } from 'express';

import { GetSummaryByDateUseCase } from './GetSummaryByDateUseCase';

class GetSummaryByDateController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { year, month } = request.params;

    const getSummaryByDateUseCase = new GetSummaryByDateUseCase();

    const result = await getSummaryByDateUseCase.execute(
      Number(year),
      Number(month)
    );

    return response.json(result);
  }
}

export { GetSummaryByDateController };
