import { Request, Response } from 'express';

import { UpdateExpenseUseCase } from './UpdateExpenseUseCase';

class UpdateExpenseController {
  public async handle(request: Request, response: Response) {
    const id = Number(request.params.id);

    const { description, value, date, category = 'Outros' } = request.body;

    const updateExpenseUseCase = new UpdateExpenseUseCase();

    const result = await updateExpenseUseCase.execute({
      id,
      description,
      value,
      date,
      category,
    });

    return response.status(200).json(result);
  }
}

export { UpdateExpenseController };
