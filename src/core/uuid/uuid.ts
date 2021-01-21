import { default as short } from "short-uuid"
import * as uuid from 'uuid';

//const translater = short();

//const t = translater.fromUUID("0b8c4aca-5bba-11eb-ae93-0242ac130002");

for(var i = 0;i<=5;i++) {
	let id = uuid.v1();
	id = id.replace(/^(.{8})-(.{4})-(.{4})/, '$3-$2-$1');
	console.debug(id);
}

//console.debug(t);


