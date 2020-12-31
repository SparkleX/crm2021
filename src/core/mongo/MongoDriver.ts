import { Connection, Driver } from "db-conn";
import { MongoClient } from "mongodb";
import { MongoConnection } from "./MongoConnection";

export class MongoDriver implements Driver {
    async connect(config: any): Promise<Connection> {
        const client = await MongoClient.connect(config, { useUnifiedTopology: true });
        const conn = new MongoConnection(client);
        return conn;
    }    
}