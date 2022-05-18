import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import { AppError } from '@errors/AppError';

interface ITokenPayload {
  sub: string;
}

export function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
): Response | void {
  if (req.url === '/users/login' || req.url === '/users/register')
    return next();

  const authHeader = req.headers.authorization;

  const [, token] = authHeader.split(' ');

  if (!token) return res.status(401).json({ error: 'Token not provided' });

  const key = process.env.SECRET_KEY;
  if (!key) throw new Error('Configurar .env');

  try {
    const { sub } = verify(token, key) as ITokenPayload;

    req.user = {
      id: sub,
    };

    return next();
  } catch (err) {
    throw new AppError('Invalid token', 401);
  }
}
