import { Collection, Db, MongoClient, ObjectID } from "mongodb";
import { BaseRepo } from "../..";
import { Context } from "../../../context/Context";

export class MongoRepo<TDomain, TKey = TDomain> extends BaseRepo<TDomain, TKey> {
	public convertId(id: string): any {
		//var oId = new ObjectID(id);
		return id;
	}
	public async findById(id: string): Promise<TDomain> {
		const collection = this.getMongoCollection();
		var od = this.convertId(id);
		const rt = await collection.findOne({ _id: od });
		return rt;
	}
	public async findAll(): Promise<TDomain[]> {
		const collection = this.getMongoCollection();
		const data = await collection.find().toArray();
		return data;
	}
	public async insert(data: TDomain): Promise<TDomain> {
		const collection = this.getMongoCollection();
		const rt = await collection.insertOne(data);
		return rt.insertedId;
	}
	public async update(id: string, data: TDomain): Promise<TDomain> {
		const collection = this.getMongoCollection();
		delete data["_id"];
		var oId = this.convertId(id);
		const rt = await collection.updateOne({ _id: oId }, { $set: data });
		data["_id"] = id;
		return data;
	}
	public async delete(id: any): Promise<void> {
		const collection = this.getMongoCollection();
		var oId = this.convertId(id);
		await collection.deleteOne({ _id: oId });
	}
	protected getMongoCollection(): Collection<any> {
		return this.getMongoDb().collection(this.name);
	}
	protected getMongoDb(): Db {
		return this.getMongoClient().db("test");
	}
	protected getMongoClient(): MongoClient {
		return Context.Current.client;
	}
}
