import { Db } from "../db/setupDb";

export interface getPokemonsProps {
  limit?: number | null;
  offset?: number | null;
  search?: string | null;
  types?: string[] | null;
}
export const MAX_QUERY_LIMIT = 100;

export class BaseController {
  protected db: Db;
  constructor(db: Db) {
    this.db = db;
  }
  protected defaultNameLetterHeight = (word?: string | null) => {
    return word ? `${word[0].toUpperCase()}${word.toLowerCase().slice(1)}` : "";
  };
}
