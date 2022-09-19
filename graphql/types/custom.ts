import { extendType } from "nexus";
import { Type } from "../../models/Type";

export const deleteMutaion = extendType({
    type: "Mutation",
    definition(t) {
      t.nonNull.field("drop", {
        type: "Boolean",
        resolve: async (_, __, { db }) => {
          try {
            const typeId = await db.table("pokemon_evolutions").del();
            await db.table("pokemon_types").del();
            await db.table("pokemon").del();
            const res = await Type.query().insert({ type: "Grass" });
            console.log(res.id);
          } catch (err) {
            console.log(err);
          }
          
          return true;
        },
      });
    },
  });
  