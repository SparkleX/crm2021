import { Context } from "../../context/Context";
import { Table } from "../../gen/schema/Table";
import { oMetadataService } from "../core/MetadataService";

export type NameMap = { [key: string]: string };

export class BaseName {
	protected getNameColumn(metaTable: Table): string {
		const fieldOrders = metaTable.fieldOrder;
		const column = fieldOrders[0];
		return column;
	}

	public async getNames(ids: string[], table: string): Promise<NameMap> {
		const metaTable = oMetadataService.getTable(table);
		const descColumn = this.getNameColumn(metaTable);
		//const params = "?,".repeat(ids.length).slice(0, -1);
		let params = "";
		for(let i = 1;i<=ids.length; i++) {
			params += `$${i},`;
		}
		params = params.slice(0, -1);
		const sql = `select "id", "${descColumn}" "desc" from "${table}" where "id" in (${params})`;
		const result = await Context.Current.conn.executeQuery(sql, ids);
		const rt: NameMap = {};
		for (const row of result) {
			rt[row["id"]] = row["desc"];
		}
		return rt;
	}
}
