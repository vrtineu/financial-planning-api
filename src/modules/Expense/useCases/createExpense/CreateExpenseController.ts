import { Request, Response } from 'express';

import { CreateExpenseUseCase } from './CreateExpenseUseCase';

class CreateExpenseController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { description, value, date, category } = request.body;
    const { userId } = request.user;

    const createExpenseUseCase = new CreateExpenseUseCase();

    const expense = await createExpenseUseCase.execute({
      description,
      value,
      date,
      category,
      userId,
    });

    return response.status(201).json(expense);
  }
}

export { CreateExpenseController };
