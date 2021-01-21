import { BaseService } from "../core/object/BaseService";
import { CampaignModel } from "../gen/model/CampaignModel";
import { CampaignRepo, oCampaignRepo } from "../repo/CampaignRepo";

class CampaignService extends BaseService<CampaignModel, CampaignRepo> {}

const oCampaignService = new CampaignService(oCampaignRepo);
export { oCampaignService };
