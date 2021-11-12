"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userMutations = void 0;
const user_1 = require("../typeDefs/user");
const graphql_1 = require("graphql");
const user_2 = require("../../service/user");
exports.userMutations = {
    createUser: {
        type: user_1.userType,
        args: {
            name: { type: graphql_1.GraphQLString },
            username: { type: graphql_1.GraphQLString },
            password: { type: graphql_1.GraphQLString },
        },
        resolve(parent, args) {
            return __awaiter(this, void 0, void 0, function* () {
                const { name, username, password } = args;
                yield user_2.service.insertUser(name, username, password);
                return args;
            });
        },
    },
    deleteUser: {
        type: user_1.userType,
        args: {
            id: { type: graphql_1.GraphQLID },
        },
        resolve(parent, args) {
            return __awaiter(this, void 0, void 0, function* () {
                const { id } = args;
                yield user_2.service.deleteUser(id);
            });
        },
    },
};
