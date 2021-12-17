import { ConnectionServer } from "../interfaces/connection";
import { Gateway } from "../interfaces/gateway";
import { Server } from "./server";

let connection: ConnectionServer;

export function getServer<S extends Gateway = {}, C extends Gateway = {}>(): ConnectionServer<S, C> {
	if (!connection) {
		throw `Server connection is not initialized; Did you call 'createServer' before igniting Flamework?`;
	}
	return connection;
}

export function createServer<S extends Gateway, C extends Gateway>(): ConnectionServer<S, C> {
	if (connection) {
		return connection;
	}
	return (connection = new Server());
}
