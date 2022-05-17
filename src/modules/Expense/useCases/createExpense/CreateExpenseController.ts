import { Request, Response } from 'express';

import { CreateExpenseUseCase } from './CreateExpenseUseCase';

class CreateExpenseController {
  public async handle(request: Request, response: Response) {
    const { id } = request.params;
    const { description, value, date, category } = request.body;

    const createExpenseUseCase = new CreateExpenseUseCase();

    const expense = await createExpenseUseCase.execute({
      description,
      value,
      date,
      category,
      id,
    });

    return response.status(201).json(expense);
  }
}

export { CreateExpenseController };
