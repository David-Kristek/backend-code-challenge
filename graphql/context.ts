import { ExpressContext } from "apollo-server-express";
import { Db, setupDb } from "../db/setupDb";
import * as controllers from "../controllers";
export interface Context {
  db: Db;
  pokemon: controllers.PokemonController;
  type: controllers.TypeController;
  favoritePokemon: controllers.FavoritePokemonController;
}

export const context =
  (db: Db) =>
  ({ req, res }: ExpressContext): Context => {
    //   const db = setupDb();
    //   if (db.client.connectionSettings) {
    //   }
    const pokemon = new controllers.PokemonController(db);
    const type = new controllers.TypeController(db);
    const favoritePokemon = new controllers.FavoritePokemonController(db);
    return { db, pokemon, type, favoritePokemon };
  };
