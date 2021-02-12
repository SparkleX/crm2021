import { Connection } from "db-conn";
import * as jsonfile from "jsonfile";
import { Context } from "../context/Context";
import { Chart } from "../gen/schema/Chart";
import { View } from "../gen/schema/View";

export class AnalyticService {
	async query(chart: string): Promise<any> {
		const oChart: Chart = jsonfile.readFileSync(`resources/analytics/chart/${chart}.chart.json`);
		const oSemantic: Chart = jsonfile.readFileSync(`resources/analytics/semantic/${oChart.query}.semantic.json`);
		const oView: View = jsonfile.readFileSync(`resources/analytics/view/${oSemantic.query}.view.json`);
		const collection = this.getConnection();
		const rt = (await collection.executeQuery(`select * from "" where "id"=$1`, [1])) as any;
		//return rt[0];
		return oView;
	}
	protected getConnection(): Connection {
		return Context.Current.conn;
	}
}

var oAnalyticService = new AnalyticService();
export { oAnalyticService };
