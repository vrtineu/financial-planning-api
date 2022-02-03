"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var schema = new mongoose_1.Schema({
    email: {
        type: String,
        required: [true, "Email é obrigatório"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Senha é obrigatória"],
    },
});
var Users = (0, mongoose_1.model)("Users", schema, "users");
exports.default = Users;
