import { BaseController } from "../../core";
import { oResponseOptionService } from "../../service/object/ResponseOptionService";




const oResponseOptionController = BaseController.extend(oResponseOptionService);
oResponseOptionController.prefix("/ResponseOption");

export { oResponseOptionController };
