import koaStatic from "koa-static";
import Koa from "koa";
import koaLogger from "koa-logger";
import koaMount from "koa-mount";
import bodyParser from "koa-bodyparser";

const app = new Koa();
app.use(koaLogger());
app.use(bodyParser());

app.use(koaMount("/web", koaStatic("public")));

const port = process.env.PORT || 3000;
app.listen(port);
console.info(`server listen on port: ${port}`);
