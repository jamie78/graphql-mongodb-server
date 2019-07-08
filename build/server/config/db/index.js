"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../../models/User"));
const Post_1 = __importDefault(require("../../models/Post"));
const Comment_1 = __importDefault(require("../../models/Comment"));
exports.models = {
    User: User_1.default,
    Post: Post_1.default,
    Comment: Comment_1.default,
};
