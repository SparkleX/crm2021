import { Connection } from "db-conn";
import { BaseRepo } from "..";
import { Context } from "../../context/Context";
import { BaseModel } from "../model/BaseModel";
import { UUIDHelper } from "../uuid/uuid";
import { SqlRepo } from "./sql/SqlRepo";

export abstract class BaseService<TDomain extends BaseModel, TRepo extends BaseRepo<TDomain>> {
	protected repo: TRepo;
	public table: string;

	constructor(repo: TRepo) {
		this.repo = repo;
		const name = this.constructor.name;
		this.table = name.substr(0, name.length - "Service".length);
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
		if(!array) {
			return ;
		}
		for (const a of array) {
			a.id = UUIDHelper.sortable();
			a.parent = parent;
			await repo.insert(a);
		}
	}
	protected async updateArray(array: BaseModel[], parent: string, repo: SqlRepo<BaseModel>): Promise<void> {
		if(!array) {
			return ;
		}
		for (const a of array) {
			a.parent = parent;
			if (a.id) {
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

	public async next(id: string): Promise<TDomain> {
		const collection = this.getConnection();
		const ids = (await collection.executeQuery(`select * from "${this.table}" where "id">$1 order by "id" limit 1 `, [
			id
		])) as any;
		const rt = await this.findById(ids[0].id);
		return rt;
	}
	public async prev(id: string): Promise<TDomain> {
		const collection = this.getConnection();
		const ids = (await collection.executeQuery(
			`select * from "${this.table}" where "id"<$1 order by "id" desc limit 1 `,
			[id]
		)) as any;
		const rt = await this.findById(ids[0].id);
		return rt;
	}
	public async first(): Promise<TDomain> {
		const collection = this.getConnection();
		const ids = (await collection.executeQuery(`select * from "${this.table}" order by "id" limit 1 `)) as any;
		const rt = await this.findById(ids[0].id);
		return rt;
	}

	public async last(): Promise<TDomain> {
		const collection = this.getConnection();
		const ids = (await collection.executeQuery(`select * from "${this.table}" order by "id" desc limit 1 `)) as any;
		const rt = await this.findById(ids[0].id);
		return rt;
	}

	protected getConnection(): Connection {
		return Context.Current.conn;
	}
}
