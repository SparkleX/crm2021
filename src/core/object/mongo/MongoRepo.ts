import { Collection, Db, MongoClient, ObjectID } from "mongodb";
import { BaseRepo } from "../..";
import { Context } from "../../../context/Context";

export class MongoRepo<TDomain, TKey = TDomain> extends BaseRepo<TDomain, TKey> {
	public async findById(id: string): Promise<TDomain> {
		const collection = this.getMongoCollection();
		var oId = new ObjectID(id);
		const rt = await collection.findOne({ _id: oId });
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
		var oId = new ObjectID(id);
		const rt = await collection.updateOne({ _id: oId }, { $set: data });
		return data;
	}
	public async delete(id: any): Promise<void> {
		const collection = this.getMongoCollection();
		var oId = new ObjectID(id);
		collection.deleteOne({ _id: oId });
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
