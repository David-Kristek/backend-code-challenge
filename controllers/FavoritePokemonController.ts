import { Db } from "../db/setupDb";
import FavoritePokemons from "../models/FavoritePokemon";
import Pokemon from "../models/Pokemon";
import {
  BaseController,
  getPokemonsProps,
  MAX_QUERY_LIMIT,
} from "./BaseController";

export class FavoritePokemonController extends BaseController {
  constructor(db: Db) {
    super(db);
    this.getFavoritePokemons = this.getFavoritePokemons.bind(this);
  }
  async getFavoritePokemons({
    offset,
    limit,
    search,
    types,
  }: getPokemonsProps) {
    const data = await FavoritePokemons.query()
      .limit(limit ?? MAX_QUERY_LIMIT)
      .offset(offset ?? 0)
      .withGraphFetched("pokemon.[types, evolutions]")
      //   .joinRelated("[pokemon, pokemon.types]")
      // types filter not working
      .joinRelated("pokemon")
      .whereRaw(`pokemon.name LIKE '%${this.defaultNameLetterHeight(search)}%'`)
      .where((builder) =>
        types && types.length > 0
          ? builder.whereIn("pokemon.types.type", types)
          : null
      );

    return data.map((favoritePokemon) => favoritePokemon.pokemon);
  }
  async likePokemon(pokemonId: number) {
    const pokemon = Pokemon.query().findById(pokemonId);
    if (!pokemon) {
      console.log(`pokemon ${pokemonId} was not found`);
      return false;
    }
    await FavoritePokemons.query().insert({ pokemon_id: pokemonId });
    return true;
  }
  async unLikePokemon(pokemonId: number) {
    const pokemon = Pokemon.query().findById(pokemonId);
    if (!pokemon) {
      console.log(`pokemon ${pokemonId} was not found`);
      return false;
    }
    await FavoritePokemons.query().delete().where("pokemon_id", pokemonId);
    return true;
  }
}
