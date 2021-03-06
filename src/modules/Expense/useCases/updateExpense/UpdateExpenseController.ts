import { Request, Response } from 'express';

import { UpdateExpenseUseCase } from './UpdateExpenseUseCase';

class UpdateExpenseController {
  public async handle(request: Request, response: Response) {
    const { id } = request.params;
    const { userId } = request.user;
    const { description, value, date, category = 'Outros' } = request.body;

    const updateExpenseUseCase = new UpdateExpenseUseCase();

    const result = await updateExpenseUseCase.execute({
      id: Number(id),
      description,
      value,
      date,
      category,
      userId,
    });

    return response.json(result);
  }
}

export { UpdateExpenseController };
