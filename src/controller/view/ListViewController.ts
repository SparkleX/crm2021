import koaRouter from "koa-router";
import { oListViewService } from "../../service/view/ListViewService";

const oListViewController = new koaRouter();
oListViewController.prefix("/view");

oListViewController.get("/list/:id", async (ctx) => {
	const id = ctx.params.id;
	ctx.body = await oListViewService.findById(id);
});

export { oListViewController };
