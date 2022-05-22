import { Request, Response } from 'express';

import { GetIncomesUseCase } from './GetIncomesUseCase';

class GetIncomesController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { description } = request.query as { description: string };
    const { userId } = request.user;

    const getIncomesUseCase = new GetIncomesUseCase();

    const incomes = await getIncomesUseCase.execute(description, userId);

    return response.json(incomes);
  }
}

export { GetIncomesController };
