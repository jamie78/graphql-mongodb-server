"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongodb_1 = require("mongodb");
const Schema = mongoose_1.default.Schema;
mongodb_1.ObjectID.prototype.valueOf = function () {
    return this.toString();
};
const CommentSchema = new Schema({
    text: {
        type: String,
        required: true,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: 'Post',
    },
});
exports.default = mongoose_1.default.model('Comment', CommentSchema);
