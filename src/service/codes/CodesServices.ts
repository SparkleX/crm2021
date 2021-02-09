import * as glob from "glob";
import * as jsonfile from "jsonfile";

class CodesService {
	public toArray(object: object): any[] {
		const rt = [];
		for (const key in object) {
			rt.push({ value: key, desc: object[key] });
		}
		return rt;
	}
	public async findAll(): Promise<any> {
		const rt = {};
		const files = glob.sync(`resources/codes/**/*.json`);
		for (const filename of files) {
			const data = jsonfile.readFileSync(filename);
			const start = "resources/codes/".length;
			let key = filename.substr(start, filename.length - start - ".json".length);
			//key = key.replace(/\//g, ".");
			//const array = this.toArray(data);
			rt[key] = data;
		}
		return rt;
	}
}

const oCodesService = new CodesService();
export { oCodesService };
