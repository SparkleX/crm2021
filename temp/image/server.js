const koaStatic = require("koa-static");
const Koa  = require("koa");
const koaLogger  = require("koa-logger");
const koaMount  = require("koa-mount");


const app = new Koa();
app.use(koaLogger());

app.use(koaMount("/", koaStatic(".")));

const port = process.env.PORT || 3000;
app.listen(port);
console.info(`server listen on port: ${port}`);
