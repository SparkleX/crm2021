import { BaseRepo, BaseService } from "..";
import { oDescService } from "../../service/core/DescService";
import { BaseModel } from "../model/BaseModel";

export abstract class BaseMashupService<
	TService extends BaseService<TDomain, TRepo>,
	TRepo extends BaseRepo<TDomain, TDomain>,
	TDomain
> {
	service: TService;

	constructor(service: TService) {
		this.service = service;
	}
	public async load(id: string): Promise<TDomain> {
		const rt = await this.service.findById(id);
		await oDescService.buildObject(rt, this.service.table);
		return rt;
	}
}
