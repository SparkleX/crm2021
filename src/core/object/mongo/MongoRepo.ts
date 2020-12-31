import { Collection, Db, MongoClient } from "mongodb";
import { BaseRepo } from "../..";
import { Context } from "../../../context/Context";

export class MongoRepo<TDomain, TKey = TDomain> extends BaseRepo<TDomain, TKey> {
	public async findById(param: any[]): Promise<TDomain> {
		throw -1;
	}
	public async findAll(): Promise<TDomain[]> {
		const collection = this.getMongoCollection();
		const data = await collection.find().toArray();
		return data;
	}
	public async insert(data: TDomain): Promise<TDomain> {
		throw -1;
	}
	public async update(key: TDomain, data: TDomain): Promise<TDomain> {
		throw -1;
	}
	public async delete(key: TDomain): Promise<TDomain> {
		throw -1;
	}
	protected getMongoCollection(): Collection<any> {
		return this.getMongoDb().collection("Partner");
	}
	protected getMongoDb(): Db {
		return this.getMongoClient().db("test");
	}
	protected getMongoClient(): MongoClient {
		return Context.Current.client;
	}
}
