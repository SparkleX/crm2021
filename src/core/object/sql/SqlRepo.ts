import { Connection } from "db-conn";
import { BaseRepo } from "../..";
import { Context } from "../../../context/Context";

interface SqlParam {
	sql?: string;
	params?: any[];
}

export class SqlRepo<TDomain> extends BaseRepo<TDomain> {
	public async findById(id: string): Promise<TDomain> {
		const collection = this.getConnection();
		const rt = (await collection.executeQuery(`select * from "${this.name}" where "id"=$1`, [id])) as any;
		return rt;
	}
	public async findAll(): Promise<TDomain[]> {
		const collection = this.getConnection();
		const data = (await collection.executeQuery(`select * from "${this.name}"`)) as any;
		return data;
	}
	public async insert(data: TDomain): Promise<TDomain> {
		const collection = this.getConnection();
		const sql = this.insertSql(data);
		const rt = await collection.executeQuery(sql.sql, sql.params);
		return data;
	}
	private insertSql(data: TDomain): SqlParam {
		const rt: SqlParam = {};
		rt.params = [];
		
		let columns = "";
		let params = "";
		let i = 1;
		for (const column in data) {
			const value = data[column];
			rt.params.push(value);
			params += `$${i},`;
			columns += column;
			i++;
		}
		params = params.substr(0, params.length-1);
		columns = columns.substr(0, columns.length-1);

		rt.sql = `insert into ${this.name}(${columns}) values( ${params} )`;
		return rt;
	}
	public async update(id: string, data: TDomain): Promise<TDomain> {
		const collection = this.getConnection();
		const sql = this.updateSql(data);
		const rt = await collection.executeQuery(sql.sql, sql.params);
		return data;
	}
	private updateSql(data: TDomain): SqlParam {
		const rt: SqlParam = {};
		rt.params = [];
		
		let columns = "";
		let i = 1;
		for (const column in data) {
			const value = data[column];
			rt.params.push(value);
			columns += `"column" = $${i},`;
			i++;
		}
		columns = columns.substr(0, columns.length-1);

		rt.params.push(data["id"]);
		rt.sql = `update ${this.name} set (${columns}) where "id"=$${i}`;
		return rt;
	}
	public async delete(id: any): Promise<void> {
		const collection = this.getConnection();
		const rt = await collection.execute(`delete from "${this.name}" where "id"=$1`, [id]);
		console.debug(rt);
	}

	protected getConnection(): Connection {
		return Context.Current.conn;
	}
}
