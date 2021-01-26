import { BaseController } from "../../core";
import { oTargetGroupService } from "../../service/object/TargetGroupService";




const oTargetGroupController = BaseController.extend(oTargetGroupService);
oTargetGroupController.prefix("/TargetGroup");

export { oTargetGroupController };
