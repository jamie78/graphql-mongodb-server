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
        comment: (parent, { _id }, context, info) => __awaiter(this, void 0, void 0, function* () {
            return yield Comment_1.default.find({ _id });
        }),
        comments: (parent, args, context, info) => __awaiter(this, void 0, void 0, function* () {
            const res = yield Comment_1.default.find({})
                .populate()
                .exec();
            return res.map(u => ({
                _id: u._id.toString(),
                text: u.text,
                author: u.author,
                post: u.post,
            }));
        }),
    },
    Mutation: {
        createComment: (parent, { comment }, context, info) => __awaiter(this, void 0, void 0, function* () {
            const newComment = yield new Comment_1.default({
                text: comment.text,
                author: comment.author,
                post: comment.post,
            });
            return new Promise((resolve, reject) => {
                newComment.save((err, res) => {
                    err ? reject(err) : resolve(res);
                });
            });
        }),
        updateComment: (parent, { _id, comment }, context, info) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                Comment_1.default.findByIdAndUpdate(_id, { $set: Object.assign({}, comment) }, { new: true }).exec((err, res) => {
                    err ? reject(err) : resolve(res);
                });
            });
        }),
        deleteComment: (parent, { _id }, context, info) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                Comment_1.default.findByIdAndDelete(_id).exec((err, res) => {
                    err ? reject(err) : resolve(res);
                });
            });
        }),
    },
    Subscription: {
        comment: {
            subscribe: (parent, args, { pubsub }) => {
                //return pubsub.asyncIterator(channel)
            },
        },
    },
    Comment: {
        author: ({ author }, args, context, info) => __awaiter(this, void 0, void 0, function* () {
            return yield User_1.default.findById({ _id: author });
        }),
        post: ({ _id }, args, context, info) => __awaiter(this, void 0, void 0, function* () {
            return yield Post_1.default.findById(_id);
        }),
    },
};
