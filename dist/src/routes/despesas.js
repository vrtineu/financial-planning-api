"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var express_validator_1 = require("express-validator");
var DespesasController_1 = __importDefault(require("../controllers/DespesasController"));
var validation_1 = require("../middlewares/validation");
var despesasRouter = (0, express_1.Router)();
var despesasController = new DespesasController_1.default();
despesasRouter.post("/", __spreadArray(__spreadArray([], validation_1.bodyFields, true), [(0, express_validator_1.check)("categoria", "Categoria must be string").isString()], false), validation_1.validate, despesasController.createDespesa);
despesasRouter.get("/", despesasController.getDespesas);
despesasRouter.get("/:id", despesasController.getDespesa);
despesasRouter.get("/:year/:month", despesasController.getDespesasByYearAndMonth);
despesasRouter.put("/:id", __spreadArray(__spreadArray([], validation_1.bodyFields, true), [(0, express_validator_1.check)("categoria", "Categoria must be string").isString()], false), validation_1.validate, despesasController.updateDespesa);
despesasRouter.delete("/:id", despesasController.deleteDespesa);
exports.default = despesasRouter;
