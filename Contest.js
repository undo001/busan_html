"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var ContestSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: String,
    startTime: {
        type: Date,
        required: true
    },
    endTime: {
        type: Date,
        required: true
    },
    machines: [{
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'Machine',
            required: true
        }],
    contestExp: {
        type: Number,
        required: true,
        default: 0
    }
});
var Contest = mongoose_1.default.model('Contest', ContestSchema);
exports.default = Contest;
