import { BaseRepo, sql } from "../core";
import { MongoRepo } from "../core/object/mongo/MongoRepo";
import { CampaignModel } from "../model/CampaignModel";

export class CampaignRepo extends MongoRepo<CampaignModel, CampaignModel>{

	@sql('select * from CRD11 where "CardCode"=?')
	findByCardCode(arg0: [string]): Promise<CampaignModel[]> {
		/* istanbul ignore next */
		throw -1;
	}
}

const oCampaignRepo = new CampaignRepo();

export { oCampaignRepo };