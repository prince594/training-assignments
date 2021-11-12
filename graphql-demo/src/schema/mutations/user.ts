import { userType } from "../typeDefs/user";
import { GraphQLID, GraphQLString } from "graphql";
import { service } from "../../service/user";
export const userMutations = {
  createUser: {
    type: userType,
    args: {
      name: { type: GraphQLString },
      username: { type: GraphQLString },
      password: { type: GraphQLString },
    },
    async resolve(parent: any, args: any) {
      const { name, username, password } = args;
      await service.insertUser(name, username, password);
      return args;
    },
  },

  deleteUser: {
    type: userType,
    args: {
      id: { type: GraphQLID },
    },
    async resolve(parent: any, args: any) {
      const { id } = args;
      await service.deleteUser(id);
    },
  },
};
