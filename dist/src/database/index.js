"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connect = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function connect() {
    var db = process.env.MONGO_URI;
    if (!db)
        throw new Error("Configurar .env");
    var options = { useNewUrlParser: true, useUnifiedTopology: true };
    var connect = function () {
        mongoose_1.default.connect(db, options).catch(function (err) {
            console.log(err);
            return mongoose_1.default.connection.on("error", function (err) {
                console.log(err);
                return connect();
            });
        });
    };
    connect();
    mongoose_1.default.connection.on("disconnected", connect);
}
exports.connect = connect;
