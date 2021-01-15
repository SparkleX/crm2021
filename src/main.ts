import koaStatic from "koa-static";
import Koa from "koa";
import koaLogger from "koa-logger";
import koaMount from "koa-mount";
import bodyParser from "koa-bodyparser";
import { contextMw } from "./context/ContextMw";
import * as controller from "./controller";
import { Context } from "koa";
import { oCodesController } from "./controller/codes/CodesController";

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

app.use(koaMount("/api", oApiKoa));

app.use(koaMount("/index.html", function (ctx: Context) {
		ctx.redirect("/web/index.html");
	})
);


const port = process.env.PORT || 3000;
app.listen(port);
console.info(`server listen on port: ${port}`);
