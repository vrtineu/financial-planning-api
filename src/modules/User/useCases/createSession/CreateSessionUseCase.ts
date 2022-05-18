import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

import { AppError } from '@errors/AppError';
import User from '@modules/User/model/User';

class CreateSessionUseCase {
  public async execute(email: string, password: string) {
    if (!email || !password)
      throw new AppError('Email ou senha não preenchido');

    const user = await User.findOne({ email });
    if (!user) throw new AppError('Email ou senha incorretos', 404);

    const passwordMatched = await compare(password, user.password);
    if (!passwordMatched) throw new AppError('Email ou senha incorretos', 404);

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
