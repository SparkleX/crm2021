import koaRouter from "koa-router";
import jsonfile from "jsonfile";

const oDebugController = new koaRouter();
oDebugController.prefix("/dbg");

oDebugController.get("/", async (ctx) => {
	ctx.body = process.env;
});

export { oDebugController };
