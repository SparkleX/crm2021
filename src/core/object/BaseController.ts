import koaRouter from "koa-router";
import { BaseService } from "./BaseService";
import { Context } from "koa";

export class BaseController {
	public static extend(service: BaseService<any, any>): koaRouter {
		const router = new koaRouter();
		router.get("/", async (ctx) => {
			const id = ctx.request.query.id;
			if (id) {
				ctx.body = await service.findById(id);
				return;
			}
			ctx.body = await service.findAll();
		});
		router.post("/", async (ctx) => {
			ctx.body = await service.create(ctx.request.body);
		});
		router.put("/", async (ctx) => {
			ctx.body = await service.update(ctx.request.body._id, ctx.request.body);
		});
		router.delete("/:id", async (ctx) => {
			await service.delete(ctx.params.id);
		});
		return router;
	}
}
