import { Request, Response, NextFunction } from 'express';
import { check, ValidationChain, validationResult } from 'express-validator';

function validate(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(422).json({ errors: errors.array() });

  return next();
}

const bodyFields: ValidationChain[] = [
  check('description', 'Descrição must be string').isString(),
  check('value', 'Valor must be a float number').isFloat(),
  check('date', 'Data must be string').isString(),
];

export { validate, bodyFields };
