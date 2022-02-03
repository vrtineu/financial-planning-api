"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var ResumoController_1 = __importDefault(require("../controllers/ResumoController"));
var resumoRouter = (0, express_1.Router)();
var resumoController = new ResumoController_1.default();
resumoRouter.get("/:year/:month", resumoController.getResumoByYearAndMonth);
exports.default = resumoRouter;
