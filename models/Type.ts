import { Model } from "objection";
import path from "path";

export class Type extends Model {
  id!: string;
  type?: string;
  static getTableName() {
    return "type";
  }
  static get idColumn() {
    return "id";
  }
  //   static relationMappings() {

  //     return {
  //       pokemon: {
  //         relation: Model.ManyToManyRelation,
  //         modelClass: path.join(__dirname, 'Pokemon'),
  //         join: {
  //             from: ''
  //         }
  //       },
  //     };
  //   }
}
