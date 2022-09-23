import { objectType, extendType, nonNull, inputObjectType, list } from "nexus";

export const Pokemon = objectType({
  name: "Pokemon",
  definition(t) {
    t.int("id");
    t.string("name");
    t.string("classification");
    t.field("weight", { type: "minmaxval" });
    t.field("height", { type: "minmaxval" });
    t.float("fleeRate");
    t.int("maxCP");
    t.int("maxHP");
    t.list.field("types", { type: "Type" });
    t.list.field("evolutions", { type: "Pokemon" });
  },
});

export const pokemonQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.field("pokemons", {
      type: "Pokemon",
      resolve: async (_, __, { db, pokemon }) => {
        const pokemons = await pokemon.getPokemons();
        return pokemons as any;
      },
    });
  },
});
export const PokemonInputType = inputObjectType({
  name: "PokemonInputType",
  definition(t) {
    t.nonNull.string("id");
    t.nonNull.string("name");
    t.nonNull.string("classification");
    t.nonNull.field("weight", { type: "minmaxvalInput" });
    t.nonNull.field("height", { type: "minmaxvalInput" });
    t.nonNull.float("fleeRate");
    t.nonNull.int("maxCP");
    t.nonNull.int("maxHP");
    // not in primary table
    t.nonNull.list.nonNull.string("types");
    t.list.nonNull.field("evolutions", {
      type: "pokemonEvolutionInput",
    });
  },
});

export const pokemonMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("addPokemon", {
      type: "Boolean",
      args: { data: nonNull(list(nonNull(PokemonInputType))) },
      resolve: async (_, args, { pokemon }) => {
        return pokemon.insertPokemons(args);
      },
    });
  },
});
