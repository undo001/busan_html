"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var UserSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    avatar: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
    exp: {
        type: Number,
        default: 0
    },
    level: {
        type: Number,
        default: 1
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
});
// Method to update level based on EXP
UserSchema.methods.updateLevel = function () {
    var levels = [0, 100, 300, 600, 1000]; // Example thresholds
    var newLevel = 1;
    for (var i = 0; i < levels.length; i++) {
        if (this.exp >= levels[i]) {
            newLevel = i + 1;
        }
        else {
            break;
        }
    }
    if (newLevel !== this.level) {
        this.level = newLevel;
        return this.save();
    }
    return Promise.resolve(this);
};
var User = mongoose_1.default.model('user', UserSchema);
exports.default = User;
