
import fs from "fs";
import * as jsonfile from "jsonfile";
import { Table } from "../../gen/schema/Table";


export class MetadataService {
	private cacheTable: {
		[name: string]: Table;
	} = {};
	public getTable(table: string): Table {
		if (!this.cacheTable[table]) {
			this.cacheTable[table] = this.loadTable(table);
		}
		return this.cacheTable[table];
	}
	public loadTable(table: string): Table {
		const rt = jsonfile.readFileSync(`resources/table/${table}.table.json`, { throws: true });
		return rt;
	}
}

const oMetadataService = new MetadataService();
export { oMetadataService };
