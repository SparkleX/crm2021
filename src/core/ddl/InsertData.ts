import { Connection, Result } from "db-conn";
import { PgSqlConnectionConfig, PgSqlDriver } from "db-conn-pgsql";

import * as glob from "glob";
import * as path from "path";
import * as jsonfile from "jsonfile";
import { Field, Table } from "../../gen/schema/Table";

export class DefaultData {
	private data: { [name: string]: [] } = {};

	public readData(): void {
		const files = glob.sync(`resources/data/*.data.json`);
		for (const filename of files) {
			console.debug(filename);
			const json: Table = jsonfile.readFileSync(filename);
			const name = path.basename(filename).split(".")[0];
			this.data[name] = json as any;
		}
	}

	public async execute(conn: Connection): Promise<void> {
		this.readData();
		for (const tableName in this.data) {
			const metaTable: Table = jsonfile.readFileSync(`resources/table/${tableName}.table.json`);
			const fields = metaTable.fieldOrder.join('","');
			const paramArray = [];
			for(let i = 0;i<= metaTable.fieldOrder.length;i++) {
				paramArray.push(`$${i+1}`);
			}
			const sql = `insert into "${tableName}" ( "id","${fields}") values (${paramArray.join()})`;

			const data = this.data[tableName];
			for (const i in data) {
				const row = data[i];
				const params = [row["id"]];
				for (const field of metaTable.fieldOrder) {
					params.push(row[field]);
				}
				await conn.execute(sql, params);
			}
		}
	}
}
const oDefaultData = new DefaultData();
export { oDefaultData }
