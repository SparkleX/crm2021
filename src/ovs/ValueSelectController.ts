import koaRouter from "koa-router";
import jsonfile from "jsonfile";
import * as repoIndex from "../repo";
import { SqlRepo } from "../core/object/sql/SqlRepo";
const oValueSelectController = new koaRouter();
oValueSelectController.prefix("/ovs");

oValueSelectController.get("/data/:name", async (ctx) => {
	const repo: SqlRepo<any> = repoIndex[`o${ctx.params.name}Repo`] as any;
	const data = await repo.findAll();
	//const data = jsonfile.readFileSync(`resources/data/${ctx.params.name}.json`);
	ctx.body = data;
});
oValueSelectController.get("/metadata/:name", async (ctx) => {
	const data = jsonfile.readFileSync(`resources/ovs/${ctx.params.name}.ovs.json`);
	ctx.body = data;
});
export { oValueSelectController };
