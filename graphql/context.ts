import { ExpressContext } from "apollo-server-express";
import { Db, setupDb } from "../db/setupDb";
import * as controllers from "../controllers";
export interface Context {
  db: Db;
  pokemon: controllers.PokemonController;
}

export const context =
  (db: Db) =>
  ({ req, res }: ExpressContext): Context => {
    //   const db = setupDb();
    //   if (db.client.connectionSettings) {
    //   }
    const pokemon = new controllers.PokemonController(db);
    return { db, pokemon };
  };
