import { Next } from "koa";
import { GenericPool } from "db-conn-pool";
import { MongoDriver } from "../core/mongo/MongoDriver";
import * as cls from "cls-hooked";
import { Context } from "./Context";
import { MongoConnection } from "../core/mongo/MongoConnection";
import { PgSqlDriver, PgSqlConnectionConfig } from "db-conn-pgsql";
import * as Koa from "koa";

//const oDriver = new MongoDriver();
//const oPool = new GenericPool(oDriver, "mongodb://localhost:27017", {min: 2, max:5});
const driver = new PgSqlDriver();
let oPool = null;
const oClsSession = cls.createNamespace("clsSession");

export function getContext () {
	const rt = oClsSession.get("ClsContext") as Context;
	return rt;
}

export async function contextMw(ctx: Koa.Context, next: Next): Promise<any> {
	await oClsSession.runAndReturn(async () => {
		const conn = await oPool.getConnection();
		const context = new Context(conn);
		oClsSession.set("ClsContext", context);
		try {
			await next();
		} catch (e) {
			console.error(e);
			ctx.body = {message: e.message, stack: e.stack} ;
			ctx.status = 400;
			
		}
		await conn.close();
	});
}

export async function initPool(): Promise<void> {
	const config: PgSqlConnectionConfig = {
		user: process.env.DB_USER,
		host: process.env.DB_HOST,
		database: process.env.DB_NAME,
		password: process.env.DB_PASS,
		port: parseInt(process.env.DB_PORT),
		ssl: process.env.DB_SSL?{
			rejectUnauthorized: false
		}: undefined
	} as any;
	oPool = new GenericPool(driver, config,{min: 2, max:5});

}