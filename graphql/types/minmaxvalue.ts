import { extendType, inputObjectType, objectType } from "nexus";
import { Type } from "../../models/Type";

// https://github.com/graphql-nexus/nexus/discussions/772
export const MinMaxValue = objectType({
  name: "minmaxval",
  definition(t) {
    t.string("minimum");
    t.string("maximum");
  },
});
export const MinMaxValueInput = inputObjectType({
  name: "minmaxvalInput",
  definition(t) {
    t.string("minimum");
    t.string("maximum");
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
  