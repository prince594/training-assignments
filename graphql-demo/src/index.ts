import express from "express";
import { graphqlHTTP } from "express-graphql";
import { createConnection } from "typeorm";
import { schema } from "./schema";
import { User } from "./model/user";

const main = async () => {
  /* To create database connection */
  await createConnection({
    type: "mysql",
    database: "graphqlCRUD",
    username: "root",
    password: "",
    logging: true,
    synchronize: false,
    entities: [User],
  });
  const app = express();
  app.use(express.json());
  app.use(
    "/graphql",
    graphqlHTTP({
      schema,
      graphiql: true,
    })
  );

  app.listen(3001, () => {
    console.log("Server is running on localhost:3001");
  });
};

main().catch((err: any) => {
  console.log(err);
});
