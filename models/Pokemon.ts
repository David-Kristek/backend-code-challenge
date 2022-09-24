import { Model } from "objection";
import { Type } from "./Type";

export default class Pokemon extends Model {
  max_weight?: string;
  min_weight?: string;
  max_height?: string;
  min_height?: string;
  name?: string;
  static getTableName() {
    return "pokemon";
  }
  static get virtualAttributes() {
    return ["max_weight", "min_weight", "max_height", "min_height"];
  }
  weight() {
    return {
      maximum: this.max_weight,
      minimum: this.min_weight,
    };
  }
  height() {
    return {
      maximum: this.max_height,
      minimum: this.min_height,
    };
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
