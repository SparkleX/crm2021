import * as glob from "glob";
import * as jsonfile from "jsonfile";
import { oCodesService } from "../codes/CodesServices";

class MetadataService {

	private loadMetadata() {
		const rt = {};
		const files = glob.sync(`resources/table/**/*.table.json`);
		for (const filename of files) {
			const data = jsonfile.readFileSync(filename);
			rt[data.name] = data;
		}
		return rt;
	}
	public async findAll(): Promise<any> {
		const rt = {} as any;
		rt.tables = this.loadMetadata();
		rt.codeList = await oCodesService.findAll();
		return rt;
	}
}

const oMetadataService = new MetadataService();
export { oMetadataService };
