import { extendType } from "nexus";

export const GetTypesQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.field("types", {
      type: "Type",
      async resolve(_, __, { type: { getTypes } }) {
        return (await getTypes()) as any;
      },
    });
  },
});
