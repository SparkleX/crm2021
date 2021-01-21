import { BaseService } from "../core/object/BaseService";
import { AccountModel } from "../gen/model/AccountModel";
import { AccountRepo, oAccountRepo } from "../repo/AccountRepo";

class AccountService extends BaseService<AccountModel, AccountRepo> {}

const oAccountService = new AccountService(oAccountRepo);
export { oAccountService };
