import { BaseRepo, BaseService } from "..";
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
	public async load(id : string): Promise<TDomain> {
		const rt = await this.service.findById(id);
		return rt;
	}
	public async next(id: string): Promise<void> {}

	public async prev(id: string): Promise<void> {}
}
