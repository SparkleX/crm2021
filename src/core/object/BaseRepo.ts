export abstract class BaseRepo<TDomain, TKey = TDomain> {
	abstract findById(param: any): Promise<TDomain>;
	abstract findAll(): Promise<TDomain[]>;
	abstract insert(data: TDomain): Promise<TDomain>;
	abstract update(key: any, data: TDomain): Promise<TDomain>;
	abstract delete(key: any): Promise<void>;
}
