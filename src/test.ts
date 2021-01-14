import { MongoClient, ObjectID } from "mongodb";
import * as assert from "assert";

// Connection URL
const url = "mongodb://localhost:27017";

// Database Name
const dbName = "test";

async function test() {
	// Use connect method to connect to the server
	const client = await MongoClient.connect(url, { useUnifiedTopology: true });
	//MongoClient.connect(url, function(err, client) {
	//assert.equal(null, err);
	console.log("Connected successfully to server");

	const db = client.db(dbName);
	const collection = db.collection("Campaign");
	//const data = await collection.find().toArray();
	//var oId = new ObjectID("5fffb6f669d63300080c3df0");
	const data = await collection.findOne({ _id: "5fffb6f669d63300080c3df0" });
	console.debug(data);
	await client.close();
	//});
}

test();
