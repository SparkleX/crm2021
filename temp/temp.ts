import koaStatic from "koa-static";
import Koa from "koa";
import koaLogger from "koa-logger";
import koaMount from "koa-mount";

const app = new Koa();
app.use(koaLogger());

app.use(koaMount("/", koaStatic("temp/image")));

const port = process.env.PORT || 9904;
app.listen(port);
console.info(`server listen on port: ${port}`);

const app2 = new Koa();
app2.listen(9903);
