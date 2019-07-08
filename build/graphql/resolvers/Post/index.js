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
const merge_1 = require("../merge");
exports.default = {
    Query: {
        post: (parent, { _id }, context, info) => __awaiter(this, void 0, void 0, function* () {
            return yield Post_1.default.findOne({ _id }).exec();
        }),
        posts: (parent, args, context, info) => __awaiter(this, void 0, void 0, function* () {
            const res = yield Post_1.default.find({})
                .populate()
                .exec();
            return res.map(u => ({
                _id: u._id.toString(),
                title: u.title,
                body: u.body,
                published: u.published,
                author: u.author,
                comments: u.comments,
            }));
        }),
    },
    Mutation: {
        createPost: (parent, { post }, context, info) => __awaiter(this, void 0, void 0, function* () {
            const newPost = yield new Post_1.default({
                title: post.title,
                body: post.body,
                published: post.published,
                author: post.author,
            });
            let createdPost;
            try {
                // const result = await newPost.save();
                const result = yield new Promise((resolve, reject) => {
                    newPost.save((err, res) => {
                        err ? reject(err) : resolve(res);
                    });
                });
                createdPost = merge_1.transformPost(result);
                const creator = yield User_1.default.findById(post.author);
                if (!creator) {
                    throw new Error('User not found.');
                }
                creator.posts.push(newPost);
                yield creator.save();
                return createdPost;
            }
            catch (error) {
                console.log(error);
                throw error;
            }
        }),
        updatePost: (parent, { _id, post }, context, info) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                Post_1.default.findByIdAndUpdate(_id, { $set: Object.assign({}, post) }, { new: true }).exec((err, res) => {
                    err ? reject(err) : resolve(res);
                });
            });
        }),
        deletePost: (parent, { _id }, context, info) => __awaiter(this, void 0, void 0, function* () {
            try {
                // searching for creator of the post and deleting it from the list
                const post = yield Post_1.default.findById(_id);
                const creator = yield User_1.default.findById(post.author);
                if (!creator) {
                    throw new Error('user not found.');
                }
                const index = creator.posts.indexOf(_id);
                if (index > -1) {
                    creator.posts.splice(index, 1);
                }
                yield creator.save();
                return new Promise((resolve, reject) => {
                    Post_1.default.findByIdAndDelete(_id).exec((err, res) => {
                        err ? reject(err) : resolve(res);
                    });
                });
            }
            catch (error) {
                console.log(error);
                throw error;
            }
        }),
    },
    Subscription: {
        post: {
            subscribe: (parent, args, { pubsub }) => {
                //return pubsub.asyncIterator(channel)
            },
        },
    },
    Post: {
        author: ({ author }, args, context, info) => __awaiter(this, void 0, void 0, function* () {
            return yield User_1.default.findById(author);
        }),
        comments: ({ author }, args, context, info) => __awaiter(this, void 0, void 0, function* () {
            return yield Comment_1.default.find({ author });
        }),
    },
};
