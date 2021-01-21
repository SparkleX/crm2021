import { default as short } from "short-uuid";
import * as uuid from "uuid";

export class UUIDHelper {
	public static sortable() {
		let id = uuid.v1();
		id = id.replace(/^(.{8})-(.{4})-(.{4})/, "$3-$2-$1");
		return id;
	}
}
