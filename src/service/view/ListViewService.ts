import * as jsonfile from "jsonfile";
import { Table } from "../../gen/schema/Table";
import { oMetadataService } from "../core/MetadataService";

export class ListViewService {
	public async findById(id: string):Promise<any> {
		const metaTable: Table = oMetadataService.getTable(id);
		const json = jsonfile.readFileSync(`resources/view/list/${id}.listView.json`);
		json.filterItems = this.createFilterbar(metaTable);
		json.columns = this.createTableColumn(metaTable, json);

		return json;
	}
	private createTableColumn(metaTable: Table, view) {
		const rt = [];
		for(const column of view.columnOrder) {
			const oColumn = view.columns[column];
			rt.push(oColumn);
		}
		return rt;
	}
	private createFilterbar(metaTable: Table) {
		const rt = [];
		for (const fieldName of metaTable.fieldOrder) {
			const oItem = {
					"Type":"sap.ui.comp.filterbar.FilterItem",
					"name": fieldName,
					"label":metaTable.fields[fieldName].note,
					"control": {
						"Type":"sap.m.Input"
					}
			}
			rt.push(oItem);
			if (rt.length>5) {
				break;
			}
		}
		return rt;
	}

}

const oListViewService = new ListViewService();
export { oListViewService };
