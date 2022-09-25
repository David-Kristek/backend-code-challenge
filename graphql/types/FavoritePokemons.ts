import { extendType, intArg, nonNull } from "nexus";
import { PokemonQueryInput } from "./pokemon";

export const favoritePokemons = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.field("favoritePokemons", {
      type: "Pokemon",
      args: { query: PokemonQueryInput },
      resolve: async (
        _,
        { query },
        { favoritePokemon: { getFavoritePokemons } }
      ) => {
        const pokemons = await getFavoritePokemons(query ?? {});
        return pokemons as any;
      },
    });
  },
});

export const likePokemon = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("likePokemon", {
      type: "Boolean",
      args: { pokemonId: nonNull(intArg()) },
      resolve: async (
        _,
        { pokemonId },
        { favoritePokemon: { likePokemon } }
      ) => {
        return likePokemon(pokemonId);
      },
    });
  },
});

export const unLikePokemon = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("unLikePokemon", {
      type: "Boolean",
      args: { pokemonId: nonNull(intArg()) },
      resolve: async (
        _,
        { pokemonId },
        { favoritePokemon: { unLikePokemon } }
      ) => {
        return unLikePokemon(pokemonId);
      },
    });
  },
});
