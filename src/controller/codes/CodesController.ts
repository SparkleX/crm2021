import koaRouter from "koa-router";
import { oCodesService } from "../../service/codes/CodesServices";

const oCodesController = new koaRouter();
oCodesController.prefix("/codes");

oCodesController.get("/", async (ctx) => {
	ctx.body = await oCodesService.findAll();
});

export { oCodesController };
