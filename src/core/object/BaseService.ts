import { BaseRepo } from "..";
import { BaseModel } from "../model/BaseModel";
import { UUIDHelper } from "../uuid/uuid";
import { SqlRepo } from "./sql/SqlRepo";

export abstract class BaseService<TDomain extends BaseModel, TRepo extends BaseRepo<TDomain>> {
	protected repo: TRepo;
	public table: string;

	constructor(repo: TRepo) {
		this.repo = repo;
		this.table = this.constructor.name.substr(0, 4);
	}
	public async findById(id: string): Promise<TDomain> {
		const rt = await this.repo.findById(id);
		return rt;
	}
	public async findAll(): Promise<TDomain[]> {
		const rt = await this.repo.findAll();
		return rt;
	}
	protected async onIsValid(data: TDomain): Promise<void> {}

	public async create(data: TDomain): Promise<string> {
		await this.onIsValid(data);
		data.id = UUIDHelper.sortable();
		const rt = await this.repo.insert(data);
		return data.id;
	}
	protected async insertArray(array: BaseModel[], parent: string, repo: SqlRepo<BaseModel>): Promise<void> {
		for(const a of array) {
			a.id = UUIDHelper.sortable();
			a.parent = parent;
			await repo.insert(a);
		}
	}
	protected async updateArray(array: BaseModel[], parent: string, repo: SqlRepo<BaseModel>): Promise<void> {
		for(const a of array) {
			a.parent = parent;
			if(a.id) {
				await repo.update(a.id, a);	
				continue;
			}
			a.id = UUIDHelper.sortable();
			await repo.insert(a);
		}
	}
	public async update(id: string, data: TDomain): Promise<TDomain> {
		await this.onIsValid(data);
		await this.repo.update(id, data);
		return data;
	}

	public async delete(id: string): Promise<void> {
		await this.repo.delete(id);
	}
}
