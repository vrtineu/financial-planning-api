"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var ReceitasController_1 = __importDefault(require("../controllers/ReceitasController"));
var validation_1 = require("../middlewares/validation");
var receitasRouter = (0, express_1.Router)();
var receitasController = new ReceitasController_1.default();
receitasRouter.post("/", validation_1.bodyFields, validation_1.validate, receitasController.createReceita);
receitasRouter.get("/", receitasController.getReceitas);
receitasRouter.get("/:id", receitasController.getReceita);
receitasRouter.get("/:year/:month", receitasController.getReceitasByYearAndMonth);
receitasRouter.put("/:id", validation_1.bodyFields, validation_1.validate, receitasController.updateReceita);
receitasRouter.delete("/:id", receitasController.deleteReceita);
exports.default = receitasRouter;
