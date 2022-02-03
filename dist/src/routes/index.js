"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var receitas_1 = __importDefault(require("./receitas"));
var despesas_1 = __importDefault(require("./despesas"));
var resumo_1 = __importDefault(require("./resumo"));
var user_1 = __importDefault(require("./user"));
var middlewares_1 = require("../middlewares");
var router = (0, express_1.Router)();
router.use(middlewares_1.authMiddleware);
router.use("/receitas", receitas_1.default);
router.use("/despesas", despesas_1.default);
router.use("/resumo", resumo_1.default);
router.use("/login", user_1.default);
exports.default = router;
