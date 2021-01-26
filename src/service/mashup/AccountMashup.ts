import { BaseMashupService } from "../../core/object/BaseMashupService";
import { AccountModel } from "../../gen/model/AccountModel";
import { AccountRepo } from "../../repo/AccountRepo";
import { AccountService, oAccountService } from "../object/AccountService";

class AccountMashupService extends BaseMashupService<AccountService, AccountRepo, AccountModel> {}

const oAccountMashupService = new AccountMashupService(oAccountService);
export { oAccountMashupService };
