import { GraphQLObjectType, GraphQLSchema } from "graphql";
import { userQuery } from "./queries/user";
import { userMutations } from "./mutations/user";

const rootQuery = new GraphQLObjectType({
  name: "rootQuery",
  fields: {
    ...userQuery,
  },
});

const mutation = new GraphQLObjectType({
  name: "mutation",
  fields: {
    ...userMutations,
  },
});

export const schema = new GraphQLSchema({
  query: rootQuery,
  mutation: mutation,
});
