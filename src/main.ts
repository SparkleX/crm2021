import koaStatic from "koa-static";
import Koa, { Next } from "koa";
import koaLogger from "koa-logger";
import koaMount from "koa-mount";
import bodyParser from "koa-bodyparser";
import { contextMw, initPool } from "./context/ContextMw";
import * as controller from "./controller";
import { Context } from "koa";
import { oCodesController } from "./controller/codes/CodesController";
import { oValueSelectController } from "./ovs/ValueSelectController";
import { oDebugController } from "./dbg/DebugController";
import { oSetup } from "./Setup";

class Application {
	async execute(): Promise<void> {
		oSetup.init();
		await initPool();
		this.startWeb();
	}
	startWeb(): void {
		const app = new Koa();
		app.use(koaLogger());
		app.use(bodyParser());

		app.use(koaMount("/web", koaStatic("public")));

		const oApiKoa = new Koa();
		app.use(koaMount("/api", contextMw));
		for (const routerName in controller as any) {
			if (!routerName.startsWith("o") || !routerName.endsWith("Controller")) {
				continue;
			}
			const router = controller[routerName];
			oApiKoa.use(router.routes());
		}
		oApiKoa.use(oCodesController.routes());
		oApiKoa.use(oValueSelectController.routes());

		app.use(koaMount("/api", oApiKoa));
		app.use(oDebugController.routes());

		app.use(
			koaMount("/index.html", function (ctx: Context) {
				ctx.redirect("/web/index.html");
			})
		);

		app.use(
			koaMount("/", async function (ctx: Context, next: Next) {
				if(ctx.url==="/") {
					ctx.redirect("/web/index.html");
					return;
				}
				await next();
			})
		);

		const port = process.env.PORT || 3000;
		app.listen(port);
		console.info(`server listen on port: ${port}`);
	}
}

const oApplication = new Application();

oApplication.execute();
