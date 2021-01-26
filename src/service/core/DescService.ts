import { BaseModel } from "../../core/model/BaseModel";
import { oNameService } from "../name";
import { oMetadataService } from "./MetadataService";

export class DescService {
	public async buildObject(data: BaseModel, table: string) {
		const d = data["d"] = {};
		const metaTable = oMetadataService.getTable(table);
		for (const field in metaTable.fields) {
			const metaField = metaTable.fields[field];
			const linkToTable = metaField.linkTo;
			const linkToData = data[field];
			if (linkToTable && linkToData) {
				const nameService = oNameService.find(linkToTable);
				const name = await nameService.getNames([linkToData], linkToTable);
				const desc = name[linkToData];
				d[field] = desc;
			}
		}
		if (!metaTable.arrayTables) {
			return;
		}
		for (const alias in metaTable.arrayTables) {
			const table = metaTable.arrayTables[alias];
			const array = data[alias];
			await this.buildArray(array, table);
		}
	}
	private async buildArray(data: BaseModel[], table: string) {
		for (const d of data) {
			await this.buildObject(d, table);
		}
	}
}

const oDescService = new DescService();
export { oDescService };
