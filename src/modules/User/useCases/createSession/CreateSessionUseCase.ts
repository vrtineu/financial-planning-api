import { AppError } from 'errors/AppError';
import { sign } from 'jsonwebtoken';
import User from 'modules/User/model/User';

class CreateSessionUseCase {
  public async execute(email: string, password: string) {
    if (!email || !password)
      throw new AppError('Email ou senha não preenchido');

    const user = await User.findOne({ email });
    if (!user) throw new AppError('Usuário não encontrado', 404);

    if (user.password !== password)
      throw new AppError('Email ou senha incorretos', 404);

    const key = process.env.SECRET_KEY;
    if (!key) throw new Error('Configurar .env');

    const token = sign({ id: user.id }, key, {
      expiresIn: '1h',
    });

    return {
      token,
      user: {
        id: user._id,
        name: user.name,
        lastname: user.lastname,
        email: user.email,
      },
    };
  }
}

export { CreateSessionUseCase };
