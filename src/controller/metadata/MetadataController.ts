import koaRouter from "koa-router";
import { oMetadataService } from "../../service/metadata/MetadataService";

const oMetadataController = new koaRouter();
oMetadataController.prefix("/metadata");

oMetadataController.get("/", async (ctx) => {
	ctx.body = await oMetadataService.findAll();
});

export { oMetadataController };
