"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
// Hint Schema
var HintSchema = new mongoose_1.default.Schema({
    content: {
        type: String,
        required: true
    },
    cost: {
        type: Number,
        required: true,
        default: 1 // Cost in terms of reward reduction
    }
});
// Review Schema
var ReviewSchema = new mongoose_1.default.Schema({
    reviewerId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    reviewerName: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    rating: {
        type: Number, // Added rating field
        required: true,
        min: 1.0,
        max: 5.0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});
// Machine Schema
var MachineSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    category: {
        type: String,
        required: true
    },
    info: {
        type: String
    },
    exp: {
        type: Number,
        required: true
    },
    contestExp: {
        type: Number,
        required: true,
        default: 0
    },
    amiId: {
        type: String,
        required: true,
        unique: true
    },
    flag: {
        type: String,
        required: true
    },
    repute: {
        type: Number,
        default: 1.0
    },
    reviews: [ReviewSchema],
    hints: [HintSchema],
}, {
    timestamps: true
});
// Function to update average repute after adding a review
MachineSchema.methods.updateRepute = function () {
    if (this.reviews.length === 0) {
        this.repute = 0.0;
    }
    else {
        var totalRating = this.reviews.reduce(function (sum, review) { return sum + review.rating; }, 0);
        this.repute = totalRating / this.reviews.length; // Calculate average rating
    }
    return this.save();
};
var Machine = mongoose_1.default.model('Machine', MachineSchema);
exports.default = Machine;
