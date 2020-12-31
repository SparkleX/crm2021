export abstract class BaseRepo<TDomain, TKey = TDomain> {
	abstract findById(param: any[]): Promise<TDomain>;
	abstract findAll(): Promise<TDomain[]>;
	abstract insert(data: TDomain): Promise<TDomain>;
	abstract update(key: TDomain, data: TDomain): Promise<TDomain>;
	abstract delete(key: TDomain): Promise<TDomain>;
}
