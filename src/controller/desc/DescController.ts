import koaRouter from "koa-router";
import { oDescService } from "../../service/desc/DescService";

const oDescController = new koaRouter();
oDescController.prefix("/desc");

oDescController.post("/", async (ctx) => {
	ctx.body = await oDescService.invoke(ctx.request.body);
});

export { oDescController };
