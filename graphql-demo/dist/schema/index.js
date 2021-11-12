"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = void 0;
const graphql_1 = require("graphql");
const user_1 = require("./queries/user");
const user_2 = require("./mutations/user");
const rootQuery = new graphql_1.GraphQLObjectType({
    name: "rootQuery",
    fields: Object.assign({}, user_1.userQuery),
});
const mutation = new graphql_1.GraphQLObjectType({
    name: "mutation",
    fields: Object.assign({}, user_2.userMutations),
});
exports.schema = new graphql_1.GraphQLSchema({
    query: rootQuery,
    mutation: mutation,
});
