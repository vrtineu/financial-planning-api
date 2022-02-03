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
var __1 = __importDefault(require(".."));
var supertest_1 = __importDefault(require("supertest"));
var utils_1 = require("../utils");
var utils_2 = require("./utils");
describe("Testes nos endpoints de resumo", function () {
    beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, utils_2.limparDespesas)()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, (0, utils_2.limparReceitas)()];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    describe("Obter resumos", function () {
        it("Deve retornar os resumos", function () { return __awaiter(void 0, void 0, void 0, function () {
            var year, month, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, utils_2.criarReceita)(utils_2.dadosReceita)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, (0, utils_2.criarDespesa)(utils_2.dadosDespesa)];
                    case 2:
                        _a.sent();
                        year = new Date().getFullYear();
                        month = new Date().getMonth() + 1;
                        return [4 /*yield*/, (0, supertest_1.default)(__1.default).get("/api/resumo/".concat(year, "/").concat(month))];
                    case 3:
                        res = _a.sent();
                        expect(res.status).toBe(200);
                        expect(res.body).toHaveProperty("data.total-receitas");
                        expect(res.body).toHaveProperty("data.total-despesas");
                        expect(res.body).toHaveProperty("data.saldo");
                        expect(res.body).toHaveProperty("despesas-by-category");
                        return [2 /*return*/];
                }
            });
        }); });
        it("Deve retornar conteudo parcial se não existir despesas ou receitas", function () { return __awaiter(void 0, void 0, void 0, function () {
            var year, month, res, res2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, utils_2.limparDespesas)()];
                    case 1:
                        _a.sent();
                        year = new Date().getFullYear();
                        month = new Date().getMonth() + 1;
                        return [4 /*yield*/, (0, supertest_1.default)(__1.default).get("/api/resumo/".concat(year, "/").concat(month))];
                    case 2:
                        res = _a.sent();
                        expect(res.status).toBe(206);
                        expect(res.body).toHaveProperty("data.total-despesas", []);
                        expect(res.body).toHaveProperty("despesas-by-category", []);
                        return [4 /*yield*/, (0, utils_2.criarDespesa)(utils_2.dadosDespesa)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, (0, utils_2.limparReceitas)()];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, (0, supertest_1.default)(__1.default).get("/api/resumo/".concat(year, "/").concat(month))];
                    case 5:
                        res2 = _a.sent();
                        expect(res2.status).toBe(206);
                        expect(res2.body).toHaveProperty("data.total-receitas", []);
                        return [2 /*return*/];
                }
            });
        }); });
        it("Deve retornar erro 404 se não existir despesas ou receitas", function () { return __awaiter(void 0, void 0, void 0, function () {
            var year, month, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, utils_2.limparDespesas)()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, (0, utils_2.limparReceitas)()];
                    case 2:
                        _a.sent();
                        year = new Date().getFullYear();
                        month = new Date().getMonth() + 1;
                        return [4 /*yield*/, (0, supertest_1.default)(__1.default).get("/api/resumo/".concat(year, "/").concat(month))];
                    case 3:
                        res = _a.sent();
                        expect(res.status).toBe(404);
                        expect(res.body).toEqual(utils_1.defaultMessages.notFound);
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
