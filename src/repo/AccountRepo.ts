import { BaseRepo, sql } from "../core";
import { SqlRepo } from "../core/object/sql/SqlRepo";
import { AccountModel } from "../gen/model/AccountModel";

export class AccountRepo extends SqlRepo<AccountModel> {}

const oAccountRepo = new AccountRepo();

export { oAccountRepo };
