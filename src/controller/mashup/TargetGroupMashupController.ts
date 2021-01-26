import { BaseMashupController } from "../../core";
import { oTargetGroupMashupService } from "../../service/mashup/TargetGroupMashup";




const oTargetGroupController = BaseMashupController.extend(oTargetGroupMashupService);
oTargetGroupController.prefix("/TargetGroup");

export { oTargetGroupController };
