import { ApolloServer } from "apollo-server";
import { Db, setupDb } from "./db/setupDb";
import { makeSchema } from "nexus";
import { join } from "path";
import * as types from "./graphql/types";
import { context } from "./graphql/context";

export const schema = makeSchema({
  types,
  outputs: {
    typegen: join(__dirname, "./gen/nexus-typegen.ts"), // 2
    schema: join(__dirname, "./gen/schema.graphql"), // 3
  },
  contextType: {
    module: join(__dirname, "./graphql/context.ts"),
    export: "Context",
  },
});

const db = setupDb();
if (db.client.connectionSettings) {
  const server = new ApolloServer({ schema, context: context(db) });
  server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });
}

// psql postgres://postgres:postgres@localhost:15432/pokemonDB
