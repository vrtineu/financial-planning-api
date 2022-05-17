import { Request, Response } from 'express';

import { CreateSessionUseCase } from './CreateSessionUseCase';

class CreateSessionController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const createSessionUseCase = new CreateSessionUseCase();

    const result = await createSessionUseCase.execute(email, password);

    return response.status(200).json(result);
  }
}

export { CreateSessionController };
