import koaRouter from "koa-router";
import { BaseService } from "./BaseService";
import { Context } from "koa";

export class BaseController {

	public static extend(service: BaseService<any, any>): koaRouter {
		const router = new koaRouter();
		router.prefix("/" + service.table);

		router.post("/", async (ctx ) => {
			ctx.body = await service.create(ctx.request.body);
		});


		router.put("/", async (ctx) => {
			ctx.body = await service.create(ctx.request.body);

		});
		router.delete("/", async (ctx) => {
			await service.delete(ctx.request.body);
		});


		return router;
	}
}
