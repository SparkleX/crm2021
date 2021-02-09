import { BaseService } from "../../core/object/BaseService";
import { ResponseOptionModel } from "../../gen/model/ResponseOptionModel";
import { ResponseOptionRepo, oResponseOptionRepo } from "../../repo/ResponseOptionRepo";

export class ResponseOptionService extends BaseService<ResponseOptionModel, ResponseOptionRepo> {}

const oResponseOptionService = new ResponseOptionService(oResponseOptionRepo);
export { oResponseOptionService };
