import { BaseController } from "../../core";
import { oAccountService } from "../../service/object/AccountService";




const oAccountController = BaseController.extend(oAccountService);
oAccountController.prefix("/Account");

export { oAccountController };
