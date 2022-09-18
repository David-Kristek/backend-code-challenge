import { objectType, extendType, nonNull, stringArg } from "nexus";
import { Db } from "../../db/setupDb";

export const Person = objectType({
  name: "Person",
  definition(t) {
    t.int("id");
    t.string("name");
    t.string("email");
  },
});
export const PersonQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.field("persons", {
      type: "Person",
      resolve: async (_, __, { db }: { db: Db }) => {
        const data = await db.table("person").select("*");
        return data;
      },
    });
  },
});
export const PersonMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("addPerson", {
      type: "Person",
      args: {
        name: nonNull(stringArg()),
        email: nonNull(stringArg()),
      },
      resolve: async (_, { name, email }, { db }) => {
        const data = await db("person").insert({ name, email }).returning("*");
        return data[0];
      },
    });
  },
});
