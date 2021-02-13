import { Connection } from "db-conn";
import * as jsonfile from "jsonfile";
import { Context } from "../context/Context";
import { Chart } from "../gen/schema/Chart";
import { SemanticLayer } from "../gen/schema/SemanticLayer";
import { View } from "../gen/schema/View";

export class AnalyticService {
	async query(chart: string): Promise<any> {
		const oChart: Chart = jsonfile.readFileSync(`resources/analytic/chart/${chart}.chart.json`);
		const oSemantic: SemanticLayer = jsonfile.readFileSync(`resources/analytic/semantic/${oChart.query}.semantic.json`);
		const oView: View = jsonfile.readFileSync(`resources/analytic/view/${oSemantic.view}.view.json`);

		let sqlMeasure = "";
		for (const measure in oSemantic.measure) {
			const oMeasure = oSemantic.measure[measure];
			sqlMeasure += `${oMeasure.expr} as "${measure}",`;
		}
		sqlMeasure = sqlMeasure.substr(0, sqlMeasure.length-1);

		let sqlDim= "";
		for (const dim in oSemantic.dimension) {
			//const oDim = oSemantic.dimension[dim];
			sqlDim += `"${dim}",`;
		}
		sqlDim = sqlDim.substr(0, sqlDim.length-1);

		const sql = `select ${sqlDim},${sqlMeasure} from (${oView.sql}) TZ group by ${sqlDim}`;
		const collection = this.getConnection();
		const data = await collection.executeQuery(sql);
		const rt = { data: []};
		rt.data = data;
		return rt;
	}
	protected getConnection(): Connection {
		return Context.Current.conn;
	}
}

var oAnalyticService = new AnalyticService();
export { oAnalyticService };
