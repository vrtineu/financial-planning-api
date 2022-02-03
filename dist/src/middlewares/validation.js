"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bodyFields = exports.validate = void 0;
var express_validator_1 = require("express-validator");
function validate(req, res, next) {
    var errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty())
        return res.status(422).json({ errors: errors.array() });
    next();
}
exports.validate = validate;
var bodyFields = [
    (0, express_validator_1.check)("descricao", "Descrição must be string").isString(),
    (0, express_validator_1.check)("valor", "Valor must be a float number").isFloat(),
    (0, express_validator_1.check)("data", "Data must be string").isString(),
];
exports.bodyFields = bodyFields;
