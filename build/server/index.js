"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const graphql_yoga_1 = require("graphql-yoga");
const mongoose_1 = __importDefault(require("mongoose"));
const graphql_1 = __importDefault(require("../graphql"));
const db_1 = require("./config/db");
const { mongoURI: db } = process.env;
const pubsub = new graphql_yoga_1.PubSub();
const options = {
    port: process.env.PORT || '4000',
    endpoint: '/graphql',
    subscriptions: '/subscriptions',
    playground: '/playground',
};
const context = {
    models: db_1.models,
    pubsub,
};
// Connect to MongoDB with Mongoose.
mongoose_1.default
    .connect(String(db), {
    useCreateIndex: true,
    useNewUrlParser: true,
})
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log(err));
const server = new graphql_yoga_1.GraphQLServer({
    schema: graphql_1.default,
    context,
});
server.start(options, ({ port }) => {
    console.log(`Server is running on http://localhost:${port}`);
});
