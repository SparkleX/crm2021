import glob from "glob";
import * as jsonfile from "jsonfile";
import { Field, Table } from "../../src/gen/schema/Table";

class TableValidate {
	private error: boolean = false;
	async execute() {		
		const files = glob.sync(`resources/table/*.json`);
		for (const filename of files) {
			console.debug(filename);
			const json: Table = jsonfile.readFileSync(filename);
			const fields = Object.keys(json.fields);
			const set1 = new Set(fields);
			const set2 = new Set(json.fieldOrder);
			const a = new Set([...set1].filter(x => !set2.has(x)));
			if(a.size>0) {
				console.error("[ERROR] Missing fieldOrder: " + Array.from(a));
				this.error = true;
			}
			const b = new Set([...set2].filter(x => !set1.has(x)));

			if(b.size>0) {
				console.error("[ERROR] Invalid fieldOrder :" + Array.from(b));
				this.error = true;
			}

		}
		if(this.error) {
			throw new Error("invalid *.table.json");
		}
	}
}

const oTableValidate = new TableValidate();
export { oTableValidate };
