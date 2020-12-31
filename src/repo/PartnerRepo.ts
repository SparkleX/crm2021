import { BaseRepo, sql } from "../core";
import { PartnerModel } from "../model/PartnerModel";

export class PartnerRepo implements BaseRepo<PartnerModel>{
	findById(param: any[]): Promise<PartnerModel> {
		throw new Error("Method not implemented.");
	}
	findAll(): Promise<PartnerModel[]> {
		throw new Error("Method not implemented.");
	}
	insert(data: PartnerModel): Promise<PartnerModel> {
		throw new Error("Method not implemented.");
	}
	update(key: PartnerModel, data: PartnerModel): Promise<PartnerModel> {
		throw new Error("Method not implemented.");
	}
	delete(key: PartnerModel): Promise<PartnerModel> {
		throw new Error("Method not implemented.");
	}
	@sql('select * from CRD11 where "CardCode"=?')
	findByCardCode(arg0: [string]): Promise<PartnerModel[]> {
		/* istanbul ignore next */
		throw -1;
	}
}

const oPartnerRepo = new PartnerRepo();

export { oPartnerRepo };
