import { MongoClient } from "mongodb";
import { getContext } from "./ContextMw";

export class Context {
    client: MongoClient;
    constructor(client: MongoClient) {
        this.client = client;
    }
	public static get Current(): Context {
		const rt = getContext();
		return rt;
	}
}