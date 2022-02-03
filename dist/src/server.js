"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = __importDefault(require("./"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var port = process.env.PORT;
if (!port)
    throw new Error("Configurar .env");
_1.default.listen(port, function () {
    console.log("App listening at http://localhost:".concat(port));
});
