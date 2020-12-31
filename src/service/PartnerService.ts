import { BaseService } from "../core/object/BaseService";
import { PartnerModel } from "../model/PartnerModel";
import { oPartnerRepo, PartnerRepo } from "../repo/PartnerRepo";

class PartnerService extends BaseService<PartnerModel, PartnerRepo> {


}

const oPartnerService = new PartnerService(oPartnerRepo);
export { oPartnerService };
