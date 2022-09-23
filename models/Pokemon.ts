import { Model } from "objection";
import { Type } from "./Type";

export default class Pokemon extends Model {
  static getTableName() {
    return "pokemon";
  }
  static relationMappings = {
    types: {
      relation: Model.ManyToManyRelation,
      modelClass: Type,
      join: {
        from: "pokemon.id",
        through: {
          // pokemon_types is the join table.
          from: "pokemon_types.pokemon_id",
          to: "pokemon_types.type_id",
        },
        to: "type.id",
      },
    },
    evolutions: {
        relation: Model.ManyToManyRelation,
        modelClass: Pokemon,
        join: {
          from: "pokemon.id",
          through: {
            // pokemon_evolutions is the join table.
            from: "pokemon_evolutions.pokemon_id",
            to: "pokemon_evolutions.evolution_id",
          },
          to: "pokemon.id",
        },
      },
  };
}
