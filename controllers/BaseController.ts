import { Db } from "../db/setupDb";

export class BaseController {
  protected db: Db;
  constructor(db: Db) {
    this.db = db; 
    
  }
}
