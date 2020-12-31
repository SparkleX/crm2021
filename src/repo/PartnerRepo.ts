import { BaseRepo, sql } from "../core";
import { MongoRepo } from "../core/object/mongo/MongoRepo";
import { PartnerModel } from "../model/PartnerModel";

export class PartnerRepo extends MongoRepo<PartnerModel, PartnerModel>{

	@sql('select * from CRD11 where "CardCode"=?')
	findByCardCode(arg0: [string]): Promise<PartnerModel[]> {
		/* istanbul ignore next */
		throw -1;
	}
}

const oPartnerRepo = new PartnerRepo();

export { oPartnerRepo };
