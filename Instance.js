"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var InstanceSchema = new mongoose_1.default.Schema({
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    instanceId: {
        type: String,
        required: true,
        unique: true,
    },
    vpnIp: {
        type: String,
        validate: {
            validator: function (v) {
                return /^(\d{1,3}\.){3}\d{1,3}$/.test(v);
            },
            message: function (props) { return "".concat(props.value, " is not a valid IP address!"); },
        },
    },
    machineType: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'running', 'stopped', 'terminated'],
        default: 'pending',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    runningTime: {
        type: Date,
        default: null,
    },
    activeContests: {
        type: [mongoose_1.default.Schema.Types.ObjectId],
        ref: 'Contest',
        default: [],
    },
});
var Instance = mongoose_1.default.model('Instance', InstanceSchema);
exports.default = Instance;
