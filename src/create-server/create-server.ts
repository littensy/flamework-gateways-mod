import { ConnectionServer } from "../interfaces/connection";
import { Gateway } from "../interfaces/gateway";
import { Server } from "./server";
import { initServerMetatable } from "./server-metatable";

let connection: ConnectionServer;

export function getServer<S extends Gateway = {}, C extends Gateway = {}>(): ConnectionServer<S, C> {
	if (!connection) {
		throw `Client connection is not initialized; Try calling 'createServer' before igniting Flamework`;
	}
	return connection as ConnectionServer<S, C>;
}

export function createServer<S extends Gateway, C extends Gateway>(): ConnectionServer<S, C> {
	if (connection) {
		return connection as ConnectionServer<S, C>;
	}
	const server = new Server();
	initServerMetatable(server);
	return (connection = server as unknown as ConnectionServer<S, C>);
}
