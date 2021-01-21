import { BaseController } from "../core";
import { oTargetGroupService } from "../service/TargetGroupService";




const oTargetGroupController = BaseController.extend(oTargetGroupService);
oTargetGroupController.prefix("/TargetGroup");

export { oTargetGroupController };
