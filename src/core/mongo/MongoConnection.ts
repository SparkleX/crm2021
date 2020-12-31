import { Connection, Result } from "db-conn";
import { MongoClient } from "mongodb";

export class MongoConnection implements Connection {
    private client: MongoClient;
    constructor (client: MongoClient) {
        this.client = client;
    }
    public mongo(): MongoClient {
        return this.client;
    }
    async close(): Promise<void> {
        await this.client.close();
    }
    async execute(sql: string, params?: object | any[]): Promise<Result> {
        throw new Error("Method not implemented.");
    }
    async executeQuery(sql: string, params?: object | any[]): Promise<object[]> {
        throw new Error("Method not implemented.");
    }
    async setAutoCommit(autoCommit: boolean): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async commit(): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async rollback(): Promise<void> {
        throw new Error("Method not implemented.");
    }


}