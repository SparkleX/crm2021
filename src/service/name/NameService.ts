import { BaseName } from "./BaseName";
import * as index from ".";
import { oXXXXName } from "./XXXXName";

export class NameService {
	public find(table: string): BaseName {
		const service: BaseName = index[`o${table}Name`];
		if (service) {
			return service;
		}
		return oXXXXName;
	}
}

const oNameService = new NameService();
export { oNameService };
