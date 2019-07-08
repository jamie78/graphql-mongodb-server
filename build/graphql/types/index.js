"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const merge_graphql_schemas_1 = require("merge-graphql-schemas");
const User_1 = __importDefault(require("./User"));
const Post_1 = __importDefault(require("./Post"));
const Comment_1 = __importDefault(require("./Comment"));
const typeDefs = [User_1.default, Post_1.default, Comment_1.default];
// NOTE: 2nd param is optional, and defaults to false
// Only use if you have defined the same type multiple times in
// different files and wish to attempt merging them together.
exports.default = merge_graphql_schemas_1.mergeTypes(typeDefs, { all: true });
