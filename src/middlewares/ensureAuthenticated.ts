import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import { AppError } from '@errors/AppError';

interface ITokenPayload {
  id: string;
}

export function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  if (request.url === '/users/login' || request.url === '/users/register')
    return next();

  const authHeader = request.headers.authorization;

  if (!authHeader) throw new AppError('Authorization header is missing', 401);

  const [, token] = authHeader.split(' ');

  if (!token) return response.status(401).json({ error: 'Token not provided' });

  const key = process.env.SECRET_KEY;
  if (!key) throw new Error('Configurar .env');

  try {
    const { id } = verify(token, key) as ITokenPayload;

    request.user = {
      userId: id,
    };

    return next();
  } catch (err) {
    throw new AppError('Invalid token', 401);
  }
}
