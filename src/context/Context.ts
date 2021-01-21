import { Connection } from "db-conn";
import { MongoClient } from "mongodb";
import { getContext } from "./ContextMw";

export class Context {
    conn: Connection;
    constructor(conn: Connection) {
        this.conn = conn;
    }
	public static get Current(): Context {
		const rt = getContext();
		return rt;
	}
}