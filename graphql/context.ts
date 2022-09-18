import { ExpressContext } from "apollo-server-express";
import { Db, setupDb } from "../db/setupDb";

export interface Context {
  db: Db;
}

export const context = (db: Db) => ({ req, res }: ExpressContext): Context => {
//   const db = setupDb();
//   if (db.client.connectionSettings) {
//   }
  return { db };
};
