import koaStatic from "koa-static";
import Koa, { Next } from "koa";
import koaLogger from "koa-logger";
import koaMount from "koa-mount";
import bodyParser from "koa-bodyparser";
import { contextMw, initPool } from "./context/ContextMw";
import * as controller from "./controller/object";

import { Context } from "koa";

import { oCodesController } from "./controller/codes/CodesController";
import { oDescController } from "./controller/desc/DescController";
import { oValueSelectController } from "./ovs/ValueSelectController";
import { oDebugController } from "./dbg/DebugController";
import { oSetup } from "./Setup";
import { oMetadataController } from "./controller/metadata/MetadataController";
import { oListViewController } from "./controller/view/ListViewController";
import { oAnalyticController } from "./analytic/AnalyticController";
class Application {
	async execute(): Promise<void> {
		oSetup.init();
		await initPool();
		this.startWeb();
	}
	private scanController(index, koa:Koa) {
		for (const routerName in index as any) {
			if (!routerName.startsWith("o") || !routerName.endsWith("Controller")) {
				continue;
			}
			const router = index[routerName];
			koa.use(router.routes());
		}
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
		oApiKoa.use(oMetadataController.routes());
		oApiKoa.use(oDescController.routes());
		oApiKoa.use(oValueSelectController.routes());
		oApiKoa.use(oListViewController.routes());

		app.use(koaMount("/api", oApiKoa));
		app.use(oDebugController.routes());

		app.use(koaMount("/ana", contextMw));
		app.use(koaMount("/ana", oAnalyticController.routes()));

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
