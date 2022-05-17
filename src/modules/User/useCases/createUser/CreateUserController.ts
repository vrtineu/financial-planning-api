import { Request, Response } from 'express';

import { CreateUserUseCase } from './CreateUserUseCase';

class CreateUserController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { email, password, name, lastname, role } = request.body;

    const createUserUseCase = new CreateUserUseCase();

    const result = await createUserUseCase.execute({
      email,
      password,
      name,
      lastname,
      role,
    });

    return response.json(result);
  }
}

export { CreateUserController };
