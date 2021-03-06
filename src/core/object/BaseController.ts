import koaRouter from "koa-router";
import { BaseService } from "./BaseService";
import { Context } from "koa";

export class BaseController {
	public static extend(service: BaseService<any, any>): koaRouter {
		const router = new koaRouter();


		router.get("/", async (ctx) => {
			ctx.body = await service.findAll();
		});
		router.get("/last", async (ctx) => {
			ctx.body = await service.last();
		});		
		router.get("/first", async (ctx) => {
			ctx.body = await service.first();
		});
		router.get("/:id", async (ctx) => {
			const id = ctx.params.id;//ctx.request.query.id;
			ctx.body = await service.findById(id);
		});		
		router.get("/:id/actions", async (ctx) => {
			ctx.body = "actions";
		});		
		router.get("/:id/next", async (ctx) => {
			ctx.body = await service.next(ctx.params.id);
		});		
		router.get("/:id/prev", async (ctx) => {
			ctx.body = await service.prev(ctx.params.id);
		});		
		router.post("/", async (ctx) => {
			ctx.body = await service.create(ctx.request.body);
		});
		router.put("/:id", async (ctx) => {
			ctx.body = await service.update(ctx.params.id, ctx.request.body);
		});
		router.delete("/:id", async (ctx) => {
			ctx.body = await service.delete(ctx.params.id);
		});
		return router;
	}
}
