import { BaseRepo, sql } from "../core";
import { SqlRepo } from "../core/object/sql/SqlRepo";
import { CampaignModel } from "../gen/model/CampaignModel";

export class CampaignRepo extends SqlRepo<CampaignModel> {}

const oCampaignRepo = new CampaignRepo();

export { oCampaignRepo };
