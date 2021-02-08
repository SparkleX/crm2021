import { BaseModel } from "../../core/model/BaseModel";
import { oNameService } from "../name";
import { oMetadataService } from "../core/MetadataService";

type DescData  = { [ guid: string ]: string }
type DescServiceData = { [ table: string ]: DescData}

export class DescService {

	public async invoke(request: DescServiceData ): Promise<DescServiceData> {
		for(const linkToTable in request) {
			const guidMap = request[linkToTable];
			let guids = Object.keys(guidMap);
			const nameService = oNameService.find(linkToTable);
			const name = await nameService.getNames(guids, linkToTable);
			request[linkToTable] = name;
		}
		return request;
	}
}

const oDescService = new DescService();
export { oDescService };
