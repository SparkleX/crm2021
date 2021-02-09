import { BaseRepo, sql } from "../core";
import { SqlRepo } from "../core/object/sql/SqlRepo";
import { ResponseOptionModel } from "../gen/model/ResponseOptionModel";

export class ResponseOptionRepo extends SqlRepo<ResponseOptionModel> {}

const oResponseOptionRepo = new ResponseOptionRepo();

export { oResponseOptionRepo };
