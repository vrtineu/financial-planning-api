"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importStar(require("mongoose"));
// eslint-disable-next-line @typescript-eslint/no-var-requires
var autoIncrement = require("mongoose-sequence")(mongoose_1.default);
var schema = new mongoose_1.Schema({
    idDespesa: {
        type: Number,
        unique: true,
    },
    categoria: {
        type: String,
        enum: [
            "Alimentação",
            "Saúde",
            "Moradia",
            "Transporte",
            "Educação",
            "Lazer",
            "Imprevistos",
            "Outros",
        ],
        default: "Outros",
    },
    descricao: {
        type: String,
        required: [true, "Descrição é obrigatória"],
    },
    valor: {
        type: Number,
        min: [0, "Valor não pode ser negativo"],
        required: [true, "Valor é obrigatório"],
    },
    data: {
        type: Date,
        required: [true, "Data é obrigatória"],
    },
});
schema.plugin(autoIncrement, { inc_field: "idDespesa" });
var Despesas = (0, mongoose_1.model)("Despesas", schema, "despesas");
exports.default = Despesas;
