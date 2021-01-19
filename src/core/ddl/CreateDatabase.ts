import { Result } from "db-conn";
import { PgSqlConnectionConfig, PgSqlDriver } from "db-conn-pgsql";

import * as glob from "glob";
import * as path from "path";
import * as jsonfile from "jsonfile";
import { Field, Table } from "../../gen/schema/Table";

function readMetadata() {
	const tables = {};
	const files = glob.sync(`resources/table/*.json`);
	for (const filename of files) {
		console.debug(filename);

		const json: Table = jsonfile.readFileSync(filename);
		tables[json.name] = json;
	}
	return tables;
}
function getFieldType(field: Field) {
	switch(field.type) {
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
	}
}

function convertToSql(tables: { [key:string]:Table}) {
	const sqls = [];
	for (const name in tables) {
		const table = tables[name];
		let columns = "";

		for(const fieldName of table.fieldOrder) {
			const metaField = table.fields[fieldName];
			const fieldType = getFieldType(metaField);
			columns+=`${fieldName} ${fieldType} ,`;
		}
		const sql = `create table "${name}" ( id character varying(40) NOT NULL, ${columns} PRIMARY KEY (id))`
		sqls.push(sql);
	}
	return sqls;
}
async function main() {
	const tables = readMetadata();
	const sqls = convertToSql(tables);

	const config: PgSqlConnectionConfig = {
		user: "postgres",
		host: "localhost",
		database: "test",
		password: "1234",
		port: 5432
	};
	const driver = new PgSqlDriver();
	const conn = await driver.connect(config);
	//let rt: Result = await conn.execute(`SET search_path TO "test"`);
	for(const sql of sqls) {
		console.debug(sql);
		await conn.execute(sql);
	}
	await conn.close();
}

main();
