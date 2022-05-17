import { Router } from 'express';
import { check } from 'express-validator';

import UserController from '../controllers/UserController';
import { validate } from '../middlewares/validation';

const userRoutes = Router();
const userController = new UserController();

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
  userController.login
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
  userController.register
);

export { userRoutes };
