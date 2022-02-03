"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Despesas_1 = __importDefault(require("../models/Despesas"));
var database_1 = require("../database");
var utils_1 = require("../utils");
var services_1 = require("../services");
var DespesasController = /** @class */ (function () {
    function DespesasController() {
        (0, database_1.connect)();
    }
    DespesasController.prototype.createDespesa = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, descricao, valor, data, categoria, despesa, despesaAlreadyExists, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        _a = req.body, descricao = _a.descricao, valor = _a.valor, data = _a.data, categoria = _a.categoria;
                        despesa = new Despesas_1.default({
                            descricao: descricao,
                            valor: valor,
                            data: data,
                            categoria: categoria,
                        });
                        return [4 /*yield*/, (0, services_1.isFromSameMonth)(req, Despesas_1.default)];
                    case 1:
                        despesaAlreadyExists = _b.sent();
                        if (despesaAlreadyExists)
                            return [2 /*return*/, (0, utils_1.resDefaultMessage)(res, 400, "registered")];
                        return [4 /*yield*/, despesa.save()];
                    case 2:
                        _b.sent();
                        return [2 /*return*/, (0, utils_1.resDefaultMessage)(res, 201, "success")];
                    case 3:
                        error_1 = _b.sent();
                        return [2 /*return*/, (0, utils_1.resError)(res, error_1)];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    DespesasController.prototype.getDespesas = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var descricao, regexParam, filter, despesas, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        descricao = req.query.descricao;
                        regexParam = new RegExp("^".concat(descricao, "$"), "i");
                        filter = descricao ? { descricao: regexParam } : {};
                        return [4 /*yield*/, Despesas_1.default.find(filter).select("-__v -_id -idDespesa")];
                    case 1:
                        despesas = _a.sent();
                        if (!despesas || !despesas.length || descricao === "")
                            return [2 /*return*/, (0, utils_1.resDefaultMessage)(res, 404, "notFound")];
                        return [2 /*return*/, res.status(200).json(despesas)];
                    case 2:
                        error_2 = _a.sent();
                        return [2 /*return*/, (0, utils_1.resError)(res, error_2)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    DespesasController.prototype.getDespesa = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, despesa, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        id = Number(req.params.id);
                        return [4 /*yield*/, Despesas_1.default.findOne({ idDespesa: id }).select("-__v -_id -idDespesa")];
                    case 1:
                        despesa = _a.sent();
                        if (!despesa)
                            return [2 /*return*/, (0, utils_1.resDefaultMessage)(res, 404, "notFound")];
                        return [2 /*return*/, res.status(200).json(despesa)];
                    case 2:
                        error_3 = _a.sent();
                        return [2 /*return*/, (0, utils_1.resError)(res, error_3)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    DespesasController.prototype.updateDespesa = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, _a, descricao, valor, data, categoria, idExists, despesa, error_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 4, , 5]);
                        id = Number(req.params.id);
                        _a = req.body, descricao = _a.descricao, valor = _a.valor, data = _a.data;
                        categoria = req.body.categoria;
                        if (!categoria)
                            categoria = "Outros";
                        return [4 /*yield*/, Despesas_1.default.findOne({ idDespesa: id })];
                    case 1:
                        idExists = _b.sent();
                        if (!idExists)
                            return [2 /*return*/, (0, utils_1.resDefaultMessage)(res, 404, "notFound")];
                        return [4 /*yield*/, (0, services_1.isFromSameMonth)(req, Despesas_1.default)];
                    case 2:
                        despesa = _b.sent();
                        if (despesa)
                            return [2 /*return*/, (0, utils_1.resDefaultMessage)(res, 400, "registered")];
                        return [4 /*yield*/, Despesas_1.default.findOneAndUpdate({ idDespesa: id }, { descricao: descricao, valor: valor, data: data, categoria: categoria })];
                    case 3:
                        _b.sent();
                        return [2 /*return*/, (0, utils_1.resDefaultMessage)(res, 200, "updated")];
                    case 4:
                        error_4 = _b.sent();
                        return [2 /*return*/, (0, utils_1.resError)(res, error_4)];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    DespesasController.prototype.deleteDespesa = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, despesa, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        id = Number(req.params.id);
                        return [4 /*yield*/, Despesas_1.default.findOneAndDelete({ idDespesa: id })];
                    case 1:
                        despesa = _a.sent();
                        if (!despesa)
                            return [2 /*return*/, (0, utils_1.resDefaultMessage)(res, 404, "notFound")];
                        return [2 /*return*/, (0, utils_1.resDefaultMessage)(res, 200, "deleted")];
                    case 2:
                        error_5 = _a.sent();
                        return [2 /*return*/, (0, utils_1.resError)(res, error_5)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    DespesasController.prototype.getDespesasByYearAndMonth = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, year, month, filter, despesas, error_6;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.params, year = _a.year, month = _a.month;
                        filter = {
                            data: {
                                $gte: new Date("".concat(year, "-").concat(month, "-01")),
                                $lte: new Date("".concat(year, "-").concat(month, "-31")),
                            },
                        };
                        return [4 /*yield*/, Despesas_1.default.find(filter).select("-__v -_id -idDespesa")];
                    case 1:
                        despesas = _b.sent();
                        if (!despesas || !despesas.length)
                            return [2 /*return*/, (0, utils_1.resDefaultMessage)(res, 404, "notFound")];
                        return [2 /*return*/, res.status(200).json(despesas)];
                    case 2:
                        error_6 = _b.sent();
                        return [2 /*return*/, (0, utils_1.resError)(res, error_6)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return DespesasController;
}());
exports.default = DespesasController;
