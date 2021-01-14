import { BaseController } from "../core";
import { oCampaignService } from "../service/CampaignService";




const oCampaignController = BaseController.extend(oCampaignService);
oCampaignController.prefix("/Campaign");

export { oCampaignController };
