import knex, { Knex } from "knex";
import { Model } from "objection";
// @ts-ignore
import knexfile from "../knexfile";

export const setupDb = () => {
  const db = knex(knexfile.development);
  Model.knex(db)
  return db;
};
export type Db = Knex<any, unknown[]>;
