import { PgSqlConnectionConfig, PgSqlDriver } from "db-conn-pgsql";
import { oSetup } from "../../Setup";
import { oCreateTable } from "./CreateTable";
import { oDefaultData } from "./InsertData";

class CreateDatabase {
	public async execute(): Promise<void> {
		oSetup.init();
		const config: PgSqlConnectionConfig = {
			user: process.env.DB_USER,
			host: process.env.DB_HOST,
			database: process.env.DB_NAME,
			password: process.env.DB_PASS,
			port: parseInt(process.env.DB_PORT)
		};
		const driver = new PgSqlDriver();
		const conn = await driver.connect(config);
		await oCreateTable.execute(conn);
		await oDefaultData.execute(conn);
		await conn.close();
	}
}

const oCreateDatabase = new CreateDatabase();
oCreateDatabase.execute();
