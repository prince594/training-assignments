"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.service = void 0;
const user_1 = require("../model/user");
exports.service = {
    findAllUsers: () => {
        return user_1.User.find();
    },
    insertUser: (name, username, password) => {
        return user_1.User.insert({ name, username, password });
    },
    deleteUser: (id) => {
        user_1.User.delete({ id });
    },
};
