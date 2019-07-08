"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("./User"));
const user = (userId) => __awaiter(this, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findById(userId);
        return Object.assign({}, user._doc, { _id: user.id, createdPosts: postMessage.bind(this, user._doc.createdPosts) });
    }
    catch (error) {
        throw error;
    }
});
const transformPost = event => {
    return Object.assign({}, event._doc, { _id: event.id, creator: user.bind(this, event.creator) });
};
exports.transformPost = transformPost;
