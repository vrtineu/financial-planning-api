import { Request, Response, NextFunction } from "express";
import { check, ValidationChain, validationResult } from "express-validator";

function validate(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });

  next();
}

const bodyFields: ValidationChain[] = [
  check("descricao", "Descrição must be string").isString(),
  check("valor", "Valor must be a float number").isFloat(),
  check("data", "Data must be string").isString(),
];

export { validate, bodyFields };
