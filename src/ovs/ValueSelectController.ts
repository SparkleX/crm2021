import koaRouter from "koa-router";
import jsonfile from "jsonfile";

const oValueSelectController = new koaRouter();
oValueSelectController.prefix("/ovs");

oValueSelectController.get("/data/:name", async (ctx) => {
	const data = jsonfile.readFileSync(`resources/data/${ctx.params.name}.json`);
	ctx.body = data;
});

export { oValueSelectController };
