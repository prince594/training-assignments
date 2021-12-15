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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_graphql_1 = require("express-graphql");
const typeorm_1 = require("typeorm");
const schema_1 = require("./schema");
const user_1 = require("./model/user");
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    /* To create database connection */
    yield (0, typeorm_1.createConnection)({
        type: "mysql",
        database: "graphqlCRUD",
        username: "root",
        password: "",
        logging: true,
        synchronize: false,
        entities: [user_1.User],
    });
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    app.use("/graphql", (0, express_graphql_1.graphqlHTTP)({
        schema: schema_1.schema,
        graphiql: true,
    }));
    app.listen(3001, () => {
        console.log("Server is running on localhost:3001");
    });
});
main().catch((err) => {
    console.log(err);
});
