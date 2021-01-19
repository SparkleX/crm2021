import { Next } from "koa";
import { GenericPool } from "db-conn-pool";
import { MongoDriver } from "../core/mongo/MongoDriver";
import * as cls from "cls-hooked";
import { Context } from "./Context";
import { MongoConnection } from "../core/mongo/MongoConnection";

//const oDriver = new MongoDriver();
//const oPool = new GenericPool(oDriver, "mongodb://localhost:27017", {min: 2, max:5});
const oClsSession = cls.createNamespace("clsSession");

export function getContext () {
	const rt = oClsSession.get("ClsContext") as Context;
	return rt;
}

export async function contextMw(ctx: Context, next: Next): Promise<any> {
	await oClsSession.runAndReturn(async () => {
		//const conn = await oPool.getConnection() as MongoConnection;
		//const context = new Context(conn.mongo());
		//oClsSession.set("ClsContext", context);
		try {

			await next();
		} catch (e) {
			console.error(e);
		}
		//await conn.close();
	});
}
