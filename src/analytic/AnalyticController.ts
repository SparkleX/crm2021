import koaRouter from "koa-router";
import { oAnalyticService } from "./AnalyticService";

const oAnalyticController = new koaRouter();
oAnalyticController.prefix("/ana");

oAnalyticController.post("/query/:id", async (ctx) => {
	ctx.body = await oAnalyticService.query(ctx.params.id);
});

export { oAnalyticController };
