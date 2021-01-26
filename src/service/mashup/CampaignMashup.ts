import { BaseMashupService } from "../../core/object/BaseMashupService";
import { CampaignModel } from "../../gen/model/CampaignModel";
import { CampaignRepo } from "../../repo/CampaignRepo";
import { CampaignService, oCampaignService } from "../object/CampaignService";

class CampaignMashupService extends BaseMashupService<CampaignService, CampaignRepo, CampaignModel> {}

const oCampaignMashupService = new CampaignMashupService(oCampaignService);
export { oCampaignMashupService };
