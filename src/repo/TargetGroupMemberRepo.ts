import { BaseRepo, sql } from "../core";
import { SqlRepo } from "../core/object/sql/SqlRepo";
import { TargetGroupMemberModel } from "../gen/model/TargetGroupMemberModel";

export class TargetGroupMemberRepo extends SqlRepo<TargetGroupMemberModel> {

}

const oTargetGroupMemberRepo = new TargetGroupMemberRepo();

export { oTargetGroupMemberRepo };
