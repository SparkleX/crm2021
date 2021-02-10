import { BaseService } from "../../core/object/BaseService";
import { CampaignModel } from "../../gen/model/CampaignModel";
import { CampaignRepo, oCampaignRepo } from "../../repo/CampaignRepo";
import { oResponseOptionRepo } from "../../repo/ResponseOptionRepo";

export class CampaignService extends BaseService<CampaignModel, CampaignRepo> {
	public async findById(id: string): Promise<CampaignModel> {
		const rt = await super.findById(id);
		rt["responseOptions"] = await oResponseOptionRepo.findAll();
		rt["emailTemplates"] = [];
		rt["executionDetails"] = [];
		rt["responseDetails"] = [];
		rt["attachment"] = [];
		return rt;
	}
	public async create(data: CampaignModel): Promise<string> {
		const id = await super.create(data);
		//const dtTargetGroupMember: CampaignModel[] = data["Member"];
		//await super.insertArray(dtTargetGroupMember, id, oTargetGroupMemberRepo);
		return id;
	}
	public async update(id: string, data: CampaignModel): Promise<CampaignModel> {
		await super.update(id, data);
		//const dtTargetGroupMember: CampaignModel[] = data["Member"];
		//await super.updateArray(dtTargetGroupMember, id, oTargetGroupMemberRepo);
		return data;
	}
}

const oCampaignService = new CampaignService(oCampaignRepo);
export { oCampaignService };
