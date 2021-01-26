import { BaseMashupController } from "../../core";
import { oCampaignMashupService } from "../../service/mashup/CampaignMashup";




const oCampaignController = BaseMashupController.extend(oCampaignMashupService);
oCampaignController.prefix("/Campaingn");

export { oCampaignController };