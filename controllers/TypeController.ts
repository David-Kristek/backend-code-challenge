import { Type } from "../models/Type";
import { BaseController } from "./BaseController";

export class TypeController extends BaseController {
  getTypes() {
    return Type.query();
  }
}
