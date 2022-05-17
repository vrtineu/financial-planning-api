import { AppError } from 'errors/AppError';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';

import { connect } from './database';
import { router } from './routes';

const app = express();

connect();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', router);

app.use(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (err: Error, request: Request, response: Response, _next: NextFunction) => {
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
);

export default app;
