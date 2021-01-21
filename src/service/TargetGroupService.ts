import { BaseService } from "../core/object/BaseService";
import { TargetGroupMemberModel } from "../gen/model/TargetGroupMemberModel";
import { TargetGroupModel } from "../gen/model/TargetGroupModel";
import { TargetGroupRepo, oTargetGroupRepo } from "../repo/TargetGroupRepo";

class TargetGroupService extends BaseService<TargetGroupModel, TargetGroupRepo> {
	public async create(data: TargetGroupModel): Promise<string> {
		const id = super.create(data);
		const dtTargetGroupMember: TargetGroupMemberModel[] = data["TargetGroupMember"];

		return id;
	}
}

const oTargetGroupService = new TargetGroupService(oTargetGroupRepo);
export { oTargetGroupService };
