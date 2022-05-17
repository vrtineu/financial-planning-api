import { AppError } from '@errors/AppError';
import { ICreateUserDTO } from '@modules/User/dtos/ICreateUserDTO';
import User from '@modules/User/model/User';

class CreateUserUseCase {
  public async execute({
    email,
    lastname,
    name,
    password,
    role,
  }: ICreateUserDTO) {
    const userAlreadyExists = await User.findOne({ email });
    if (userAlreadyExists) throw new AppError('Usuário já existe');

    const user = new User({
      email,
      password,
      name,
      lastname,
      role,
    });

    await user.save();

    return user;
  }
}

export { CreateUserUseCase };
