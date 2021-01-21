import { BaseService } from "../core/object/BaseService";
import { TargetGroupModel } from "../gen/model/TargetGroupModel";
import { TargetGroupRepo, oTargetGroupRepo } from "../repo/TargetGroupRepo";

class TargetGroupService extends BaseService<TargetGroupModel, TargetGroupRepo> {}

const oTargetGroupService = new TargetGroupService(oTargetGroupRepo);
export { oTargetGroupService };
