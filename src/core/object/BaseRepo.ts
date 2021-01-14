export abstract class BaseRepo<TDomain, TKey = TDomain> {
	protected name: string;
	constructor() {
		this.name = this.constructor.name.substr(0, this.constructor.name.length - "Repo".length);
	}
	abstract findById(param: any): Promise<TDomain>;
	abstract findAll(): Promise<TDomain[]>;
	abstract insert(data: TDomain): Promise<TDomain>;
	abstract update(key: any, data: TDomain): Promise<TDomain>;
	abstract delete(key: any): Promise<void>;
}
