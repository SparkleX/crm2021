import { BaseRepo } from "..";

export abstract class BaseService<TDomain, TRepo extends BaseRepo<TDomain>> {
	protected repo: TRepo;
	public table: string;

	constructor(repo: TRepo) {
		this.repo = repo;
		this.table = this.constructor.name.substr(0, 4);
	}

	protected async onIsValid(data: TDomain): Promise<void> {}

	public async create(data: TDomain): Promise<TDomain> {
		await this.onIsValid(data);
		const oKey = await this.repo.insert(data);
		return oKey;
	}

	public async update(key: TDomain, data: TDomain): Promise<TDomain> {
		this.onIsValid(data);
		await this.onIsValid(data);
		const oKey = await this.repo.update(data, data);
		return oKey;
	}

	public async delete(key: TDomain): Promise<void> {
		await this.repo.delete(key);
	}
}
