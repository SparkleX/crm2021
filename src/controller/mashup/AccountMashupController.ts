import { BaseMashupController } from "../../core";
import { oAccountMashupService } from "../../service/mashup/AccountMashup";




const oAccountController = BaseMashupController.extend(oAccountMashupService);
oAccountController.prefix("/Account");

export { oAccountController };
