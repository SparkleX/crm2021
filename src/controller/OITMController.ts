import { BaseController } from "../core";
import { oPartnerService } from "../service/PartnerService";




const oPartnerController = BaseController.extend(oPartnerService);

export { oPartnerController };
