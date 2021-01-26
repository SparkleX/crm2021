import { BaseMashupService } from "../../core/object/BaseMashupService";
import { TargetGroupModel } from "../../gen/model/TargetGroupModel";
import { TargetGroupRepo } from "../../repo/TargetGroupRepo";
import { TargetGroupService, oTargetGroupService } from "../object/TargetGroupService";

class TargetGroupMashupService extends BaseMashupService<TargetGroupService, TargetGroupRepo, TargetGroupModel> {}

const oTargetGroupMashupService = new TargetGroupMashupService(oTargetGroupService);
export { oTargetGroupMashupService };