import { User } from "../model/user";

export const service = {
  findAllUsers: () => {
    return User.find();
  },
  insertUser: (name: string, username: any, password: any) => {
    return User.insert({ name, username, password });
  },
  deleteUser: (id: any) => {
    User.delete({ id });
  },
};
