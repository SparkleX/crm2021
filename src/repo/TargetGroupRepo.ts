import { BaseRepo, sql } from "../core";
import { SqlRepo } from "../core/object/sql/SqlRepo";
import { TargetGroupModel } from "../gen/model/TargetGroupModel";

export class TargetGroupRepo extends SqlRepo<TargetGroupModel> {
	@sql('select * from CRD11 where "CardCode"=?')
	findByCardCode(arg0: [string]): Promise<TargetGroupModel[]> {
		/* istanbul ignore next */
		throw -1;
	}
}

const oTargetGroupRepo = new TargetGroupRepo();

export { oTargetGroupRepo };
