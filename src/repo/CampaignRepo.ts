import { BaseRepo, sql } from "../core";
import { MongoRepo } from "../core/object/mongo/MongoRepo";
import { CampaignModel } from "../model/CampaignModel";

export class CampaignRepo extends MongoRepo<CampaignModel, CampaignModel> {}

const oCampaignRepo = new CampaignRepo();

export { oCampaignRepo };
