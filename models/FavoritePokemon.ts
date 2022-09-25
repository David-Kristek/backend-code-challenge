import { Model } from "objection";
import Pokemon from "./Pokemon";
import { Type } from "./Type";

export default class FavoritePokemons extends Model {
  pokemon_id?: number;
  pokemon?: any;
  static getTableName() {
    return "favorite_pokemons";
  }
  static relationMappings = {
    pokemon: {
      relation: Model.HasOneRelation,
      modelClass: Pokemon,
      join: {
        from: "favorite_pokemons.pokemon_id",
        to: "pokemon.id",
      },
    },
  };
}
