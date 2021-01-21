import { BaseRepo, sql } from "../core";
import { SqlRepo } from "../core/object/sql/SqlRepo";
import { PartnerModel } from "../model/PartnerModel";

export class PartnerRepo extends SqlRepo<PartnerModel> {
	@sql('select * from CRD11 where "CardCode"=?')
	findByCardCode(arg0: [string]): Promise<PartnerModel[]> {
		/* istanbul ignore next */
		throw -1;
	}
}

const oPartnerRepo = new PartnerRepo();

export { oPartnerRepo };
