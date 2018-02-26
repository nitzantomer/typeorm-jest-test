import "reflect-metadata";
import { BaseEntity, Column, ConnectionOptions, createConnection, Entity, PrimaryColumn, Connection } from "typeorm";

const config = {
	type: "sqlite",
	host: "localhost",
	port: 3306,
	username: "username",
	password: "password",
	database: "../../database.sqlite",
	synchronize: true,
	entities: []
} as ConnectionOptions;

let connection: Connection;
let initPromise: Promise<void>;

@Entity()
export class MyModel extends BaseEntity {
	@PrimaryColumn()
	public id: string;

	@Column()
	public name: string;

	@Column()
	public date: Date;
}
(config.entities as Function[]).push(MyModel);

export function init() {
	if (initPromise) {
		return initPromise;
	}

	initPromise = createConnection(config)
		.then(conn => {
			connection = conn;
			console.log("finished init");
		})
		.catch(error => {
			console.log("failed to init db: " + error);
		});

	return initPromise;
}

export function stop(): Promise<void> {
	return connection.close();
}
