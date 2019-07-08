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
const User_1 = __importDefault(require("../../../server/models/User"));
const Post_1 = __importDefault(require("../../../server/models/Post"));
const Comment_1 = __importDefault(require("../../../server/models/Comment"));
exports.default = {
    Query: {
        user: (parent, { _id }, context, info) => __awaiter(this, void 0, void 0, function* () {
            return yield User_1.default.findOne({ _id }).exec();
        }),
        users: (parent, args, context, info) => __awaiter(this, void 0, void 0, function* () {
            const users = yield User_1.default.find({})
                .populate()
                .exec();
            return users.map(u => ({
                _id: u._id.toString(),
                name: u.name,
                email: u.email,
                age: u.age,
                posts: u.posts,
                comments: u.comments,
            }));
        }),
    },
    Mutation: {
        createUser: (parent, { user }, context, info) => __awaiter(this, void 0, void 0, function* () {
            const newUser = yield new User_1.default({
                name: user.name,
                email: user.email,
                age: user.age,
            });
            return new Promise((resolve, reject) => {
                newUser.save((err, res) => {
                    err ? reject(err) : resolve(res);
                });
            });
        }),
        updateUser: (parent, { _id, user }, context, info) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                User_1.default.findByIdAndUpdate(_id, { $set: Object.assign({}, user) }, { new: true }).exec((err, res) => {
                    err ? reject(err) : resolve(res);
                });
            });
        }),
        deleteUser: (parent, { _id }, context, info) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                User_1.default.findByIdAndDelete(_id).exec((err, res) => {
                    err ? reject(err) : resolve(res);
                });
            });
        }),
    },
    User: {
        posts: ({ _id }, args, context, info) => __awaiter(this, void 0, void 0, function* () {
            return yield Post_1.default.find({ author: _id });
        }),
        comments: ({ _id }, args, context, info) => __awaiter(this, void 0, void 0, function* () {
            return yield Comment_1.default.find({ author: _id });
        }),
    },
};
