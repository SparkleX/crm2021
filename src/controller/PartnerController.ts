import { BaseController } from "../core";
import { oPartnerService } from "../service/PartnerService";




const oPartnerController = BaseController.extend(oPartnerService);
oPartnerController.prefix("/Partner");

export { oPartnerController };
