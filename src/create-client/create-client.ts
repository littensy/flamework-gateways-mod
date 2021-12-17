import { ConnectionClient } from "../interfaces/connection";
import { Gateway } from "../interfaces/gateway";
import { Client } from "./client";

let connection: ConnectionClient;

export function getClient<S extends Gateway = {}, C extends Gateway = {}>(): ConnectionClient<S, C> {
	if (!connection) {
		throw `Client connection is not initialized; Did you call 'createClient' before igniting Flamework?`;
	}
	return connection;
}

export function createClient<S extends Gateway, C extends Gateway>(): ConnectionClient<S, C> {
	if (connection) {
		return connection;
	}
	return (connection = new Client());
}
