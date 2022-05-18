import { Request, Response, NextFunction } from 'express';
import 'express-async-errors';

import { AppError } from '@errors/AppError';

async function errorHandler(
  err: Error,
  _request: Request,
  response: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
) {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      message: err.message,
    });
  }

  return response.status(500).json({
    status: 'error',
    message: `Internal server error - ${err.message}`,
  });
}

export { errorHandler };
