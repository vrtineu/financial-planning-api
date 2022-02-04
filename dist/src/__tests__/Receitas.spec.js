"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var utils_1 = require("./utils");
var utils_2 = require("../utils");
var supertest_1 = __importDefault(require("supertest"));
describe("Testes nos endpoints de receitas", function () {
    beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, utils_1.limparReceitas)()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    describe("Testes de criação", function () {
        it("Deve ser possível criar uma receita", function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, supertest_1.default)(__1.default)
                            .post("/api/receitas")
                            .send(utils_1.dadosReceita)];
                    case 1:
                        response = _a.sent();
                        expect(response.status).toBe(201);
                        expect(response.body).toEqual(utils_2.defaultMessages.success);
                        return [2 /*return*/];
                }
            });
        }); });
        it("Não deve ser possível criar outra receita com a mesma descrição no mesmo mês", function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, supertest_1.default)(__1.default)
                            .post("/api/receitas")
                            .send(utils_1.dadosReceita)];
                    case 1:
                        response = _a.sent();
                        expect(response.status).toBe(400);
                        expect(response.body).toEqual(utils_2.defaultMessages.registered);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("Testes de listagem", function () {
        it("Deve ser possível listar todas as receitas", function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, supertest_1.default)(__1.default).get("/api/receitas")];
                    case 1:
                        response = _a.sent();
                        expect(response.status).toBe(200);
                        expect(response.body).toHaveLength(1);
                        return [2 /*return*/];
                }
            });
        }); });
        it("Deve ser possível listar uma receita específica", function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, supertest_1.default)(__1.default).get("/api/receitas/1")];
                    case 1:
                        response = _a.sent();
                        expect(response.status).toBe(200);
                        expect(response.body).toHaveProperty("descricao", "Test");
                        expect(response.body).toHaveProperty("valor", 1000);
                        expect(response.body).toHaveProperty("data", expect.any(String));
                        return [2 /*return*/];
                }
            });
        }); });
        it("Deve ser possivel listar as receitas pela descricao", function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, supertest_1.default)(__1.default).get("/api/receitas?descricao=Test")];
                    case 1:
                        response = _a.sent();
                        expect(response.status).toBe(200);
                        expect(response.body[0]).toHaveProperty("descricao", "Test");
                        expect(response.body[0]).toHaveProperty("valor", 1000);
                        expect(response.body[0]).toHaveProperty("data", expect.any(String));
                        return [2 /*return*/];
                }
            });
        }); });
        it("Deve exibir mensagem se não existir receitas cadastradas", function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, utils_1.limparReceitas)()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, (0, supertest_1.default)(__1.default).get("/api/receitas")];
                    case 2:
                        response = _a.sent();
                        expect(response.status).toBe(404);
                        expect(response.body).toEqual(utils_2.defaultMessages.notFound);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("Testes de atualização", function () {
        it("Deve ser possível atualizar uma receita", function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, utils_1.limparReceitas)()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, (0, utils_1.criarReceita)(utils_1.dadosReceita)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, (0, supertest_1.default)(__1.default)
                                .put("/api/receitas/1")
                                .send(__assign(__assign({}, utils_1.dadosReceita), { descricao: "UPDATED" }))];
                    case 3:
                        response = _a.sent();
                        expect(response.status).toBe(200);
                        expect(response.body).toEqual(utils_2.defaultMessages.updated);
                        return [2 /*return*/];
                }
            });
        }); });
        it("Deve exibir mensagem se não existir receitas cadastradas", function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, utils_1.limparReceitas)()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, (0, supertest_1.default)(__1.default).put("/api/receitas/1")];
                    case 2:
                        response = _a.sent();
                        expect(response.status).toBe(404);
                        expect(response.body).toEqual(utils_2.defaultMessages.notFound);
                        return [2 /*return*/];
                }
            });
        }); });
        it("Deve exibir mensagem se não existir receita com o id informado", function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, utils_1.limparReceitas)()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, (0, utils_1.criarReceita)(utils_1.dadosReceita)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, (0, supertest_1.default)(__1.default).put("/api/receitas/123")];
                    case 3:
                        response = _a.sent();
                        expect(response.status).toBe(404);
                        expect(response.body).toEqual(utils_2.defaultMessages.notFound);
                        return [2 /*return*/];
                }
            });
        }); });
        it("Não deve ser possível atualizar uma receita se ja existe uma com a mesma descrição e mês", function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, utils_1.limparReceitas)()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, (0, utils_1.criarReceita)(utils_1.dadosReceita)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, (0, utils_1.criarReceita)(__assign(__assign({}, utils_1.dadosReceita), { data: new Date("2022-02-01") }))];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, (0, supertest_1.default)(__1.default)
                                .put("/api/receitas/1")
                                .send(__assign(__assign({}, utils_1.dadosReceita), { data: new Date("2022-02-01") }))];
                    case 4:
                        response = _a.sent();
                        expect(response.status).toBe(400);
                        expect(response.body).toEqual(utils_2.defaultMessages.registered);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("Testes de exclusão", function () {
        it("Deve ser possível excluir uma receita existente", function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, utils_1.limparReceitas)()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, (0, utils_1.criarReceita)(utils_1.dadosReceita)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, (0, supertest_1.default)(__1.default).delete("/api/receitas/1")];
                    case 3:
                        response = _a.sent();
                        expect(response.status).toBe(200);
                        expect(response.body).toEqual(utils_2.defaultMessages.deleted);
                        return [2 /*return*/];
                }
            });
        }); });
        it("Deve exibir mensagem se não existir receitas cadastradas", function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, utils_1.limparReceitas)()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, (0, supertest_1.default)(__1.default).delete("/api/receitas/1")];
                    case 2:
                        response = _a.sent();
                        expect(response.status).toBe(404);
                        expect(response.body).toEqual(utils_2.defaultMessages.notFound);
                        return [2 /*return*/];
                }
            });
        }); });
        it("Deve exibir mensagem se não existir receita com o id informado", function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, utils_1.limparReceitas)()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, (0, utils_1.criarReceita)(utils_1.dadosReceita)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, (0, supertest_1.default)(__1.default).delete("/api/receitas/123")];
                    case 3:
                        response = _a.sent();
                        expect(response.status).toBe(404);
                        expect(response.body).toEqual(utils_2.defaultMessages.notFound);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("Teste listar receitas por ano e mês", function () {
        it("Deve ser possível obter as receitas por ano e mês", function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, utils_1.limparReceitas)()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, (0, utils_1.criarReceita)(utils_1.dadosReceita)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, (0, utils_1.criarReceita)(__assign(__assign({}, utils_1.dadosReceita), { data: new Date("2022-02-01") }))];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, (0, supertest_1.default)(__1.default).get("/api/receitas/2022/02")];
                    case 4:
                        response = _a.sent();
                        expect(response.status).toBe(200);
                        expect(response.body).toHaveLength(1);
                        return [2 /*return*/];
                }
            });
        }); });
        it("Deve exibir mensagem se não existir receitas cadastradas", function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, utils_1.limparReceitas)()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, (0, supertest_1.default)(__1.default).get("/api/receitas/2022/02")];
                    case 2:
                        response = _a.sent();
                        expect(response.status).toBe(404);
                        expect(response.body).toEqual(utils_2.defaultMessages.notFound);
                        return [2 /*return*/];
                }
            });
        }); });
    });
});