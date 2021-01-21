import { Connection, Result } from "db-conn";
import { PgSqlConnectionConfig, PgSqlDriver } from "db-conn-pgsql";

import * as glob from "glob";
import * as path from "path";
import * as jsonfile from "jsonfile";
import { Field, Table } from "../../gen/schema/Table";

class CreateTable {
	readMetadata() {
		const tables = {};
		const files = glob.sync(`resources/table/*.json`);
		for (const filename of files) {
			console.debug(filename);

			const json: Table = jsonfile.readFileSync(filename);
			tables[json.name] = json;
		}
		return tables;
	}
	getFieldType(field: Field, table: string, column: string) {
		switch (field.type) {
			case "string":
			case "text":
				return `character varying(40)`;
			case "number":
				return "integer";
			case "decimal":
				return "numeric(19,6)";
			case "date":
			case "time":
				return "timestamp without time zone";
			case "guid":
				return "uuid";
			default:
				throw `unknow type ${field.type} (${table}.${column})`;
		}
	}

	convertToSql(tables: { [key: string]: Table }) {
		const sqls = [];
		for (const name in tables) {
			const table = tables[name];
			let columns = "";

			for (const fieldName of table.fieldOrder) {
				const metaField = table.fields[fieldName];
				const fieldType = this.getFieldType(metaField, name, fieldName);
				columns += `${fieldName} ${fieldType} ,`;
			}
			const sql = `create table "${name}" ( id uuid, ${columns} PRIMARY KEY (id))`;
			sqls.push(sql);
		}
		return sqls;
	}
	async execute(conn: Connection) {
		const tables = this.readMetadata();
		const sqls = this.convertToSql(tables);

		//let rt: Result = await conn.execute(`SET search_path TO "test"`);
		for (const sql of sqls) {
			console.debug(sql);
			await conn.execute(sql);
		}
	}
}

const oCreateTable = new CreateTable();
export { oCreateTable };
