import { oneOf, body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

export function validateReceita(req: Request, res: Response, next: NextFunction) {
    oneOf([
        body("id").isNumeric(),
        body("descricao").isString(),
        body("valor").isNumeric(),
        body("data").isDate()
    ])
    const errors = validationResult(req)
    return !errors.isEmpty() ? res.status(400).json(errors) : next();
}