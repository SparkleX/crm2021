import { BaseService } from "../core/object/BaseService";
import { TargetGroupMemberModel } from "../gen/model/TargetGroupMemberModel";
import { TargetGroupModel } from "../gen/model/TargetGroupModel";
import { oTargetGroupMemberRepo } from "../repo/TargetGroupMemberRepo";
import { TargetGroupRepo, oTargetGroupRepo } from "../repo/TargetGroupRepo";

class TargetGroupService extends BaseService<TargetGroupModel, TargetGroupRepo> {
	public async findById(id: string): Promise<TargetGroupModel> {
		const rt = await super.findById(id);
		rt["TargetGroupMember"] = await oTargetGroupMemberRepo.findByParent(id);
		return rt;
	}
	public async create(data: TargetGroupModel): Promise<string> {
		const id = await super.create(data);
		const dtTargetGroupMember: TargetGroupMemberModel[] = data["TargetGroupMember"];
		await super.insertArray(dtTargetGroupMember, id, oTargetGroupMemberRepo);
		return id;
	}
	public async update(id: string, data: TargetGroupModel): Promise<TargetGroupModel> {
		await super.update(id, data);
		const dtTargetGroupMember: TargetGroupMemberModel[] = data["TargetGroupMember"];
		await super.updateArray(dtTargetGroupMember, id, oTargetGroupMemberRepo);
		return data;
	}
}

const oTargetGroupService = new TargetGroupService(oTargetGroupRepo);
export { oTargetGroupService };
