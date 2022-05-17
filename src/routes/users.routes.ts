import { Router } from 'express';
import { check } from 'express-validator';

import { validate } from '@middlewares/validation';
import { CreateSessionController } from '@modules/User/useCases/createSession/CreateSessionController';
import { CreateUserController } from '@modules/User/useCases/createUser/CreateUserController';

const userRoutes = Router();

const createSessionController = new CreateSessionController();
const createUserController = new CreateUserController();

userRoutes.post(
  '/login',
  [
    check('email', 'Email must be a valid email').isEmail(),
    check(
      'password',
      'Password must be string and length is greater than 6 characters'
    )
      .isLength({ min: 6 })
      .isString(),
  ],
  validate,
  createSessionController.handle
);

userRoutes.post(
  '/register',
  [
    check('email').isEmail(),
    check('password').isLength({ min: 6 }).isString(),
    check('name').isLength({ min: 3 }).isString(),
    check('lastname').isLength({ min: 3 }).isString(),
    check('role').isString(),
  ],
  validate,
  createUserController.handle
);

export { userRoutes };
