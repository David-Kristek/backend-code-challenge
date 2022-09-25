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
          await db.table("type").del();
          const res2 = await db.table("pokemon").del();
          
          // await db.table("favorite_pokemons").del();
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
export const testMutaion = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("test", {
      type: "Boolean",
      resolve: async () => {
        try {
          const typeId = await Type.query()
            .select("id")
            .where("type", "Grass")
            .first();

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
