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
  