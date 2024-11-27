"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var ContestParticipationSchema = new mongoose_1.default.Schema({
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    contest: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Contest',
        required: true
    },
    machine: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Machine',
        required: true
    },
    // Participation-specific timings
    participationStartTime: {
        type: Date,
        default: null // Will be set when the instance becomes "running"
    },
    participationEndTime: Date,
    hintsUsed: {
        type: Number,
        default: 0
    },
    expEarned: {
        type: Number,
        default: 0
    }
});
var ContestParticipation = mongoose_1.default.model('ContestParticipation', ContestParticipationSchema);
exports.default = ContestParticipation;
