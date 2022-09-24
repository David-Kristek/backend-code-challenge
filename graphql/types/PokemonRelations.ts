import { inputObjectType, objectType } from "nexus";

export const PokemonEvolution = objectType({
  name: "pokemonEvolution",
  definition(t) {
    t.int("id");
    t.string("name");
  },
});
export const PokemonEvolutionInput = inputObjectType({
  name: "pokemonEvolutionInput",
  definition(t) {
    t.nonNull.int("id");
    t.string("name");
  },
});

export const PokemonType = objectType({
  name: "Type",
  definition(t) {
    t.nonNull.string("type");
  },
});
