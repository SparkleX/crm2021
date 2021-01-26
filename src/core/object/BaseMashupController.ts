import koaRouter from "koa-router";
import { BaseMashupService } from "..";

export class BaseMashupController {
	public static extend(service: BaseMashupService<any, any, any>): koaRouter {
		const router = new koaRouter();
		router.get("/:id", async (ctx) => {
			const id = ctx.params.id;
			ctx.body = await service.load(id);
		});

		return router;
	}
}
