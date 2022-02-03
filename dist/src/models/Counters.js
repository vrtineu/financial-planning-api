"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var schema = new mongoose_1.Schema({
    id: {
        type: String,
        unique: true,
    },
    seq: {
        type: Number,
        default: 0,
    },
    reference_value: {
        type: Number,
        default: null,
    },
});
var Counters = (0, mongoose_1.model)("Counters", schema, "counters");
exports.default = Counters;
