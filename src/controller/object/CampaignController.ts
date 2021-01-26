import { BaseController } from "../../core";
import { oCampaignService } from "../../service/object/CampaignService";




const oCampaignController = BaseController.extend(oCampaignService);
oCampaignController.prefix("/Campaign");

export { oCampaignController };
