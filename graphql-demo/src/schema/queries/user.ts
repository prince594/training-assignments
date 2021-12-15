import { GraphQLList } from "graphql";
import { userType } from "../typeDefs/user";
import { User } from "../../model/user";
import { service } from "../../service/user";

export const userQuery = {
  getAllUsers: {
    type: new GraphQLList(userType),
    async resolve(): Promise<any> {
      const results: any = await service.findAllUsers();
      return results;
    },
  },
};
