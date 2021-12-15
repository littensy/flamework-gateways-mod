import { ConnectionClient } from "../interfaces/connection";
import { Gateway } from "../interfaces/gateway";
import { Client } from "./client";
import { initClientMetatable } from "./client-metatable";

let connection: ConnectionClient;

export function getClient<S extends Gateway = {}, C extends Gateway = {}>(): ConnectionClient<S, C> {
	if (!connection) {
		throw `Client connection is not initialized; Try calling 'createClient' before igniting Flamework`;
	}
	return connection as ConnectionClient<S, C>;
}

export function createClient<S extends Gateway, C extends Gateway>(): ConnectionClient<S, C> {
	if (connection) {
		return connection as ConnectionClient<S, C>;
	}
	const client = new Client();
	initClientMetatable(client);
	return (connection = client as unknown as ConnectionClient<S, C>);
}
