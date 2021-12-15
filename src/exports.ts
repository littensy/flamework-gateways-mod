import { createClient } from "./create-client";
import { createServer } from "./create-server";
import { ConnectionClient, ConnectionServer } from "./interfaces/connection";
import { Gateway } from "./interfaces/gateway";

/**
 * Gets or initializes a client connection. Should be called before igniting Flamework.
 * @yields
 * @returns Connection client instance
 */
export function connectClient<S extends Gateway, C extends Gateway>(): ConnectionClient<S, C> {
	return createClient<S, C>();
}

/**
 * Gets or initializes a server connection. Should be called before igniting Flamework.
 * @returns Connection server instance
 */
export function connectServer<S extends Gateway, C extends Gateway>(): ConnectionServer<S, C> {
	return createServer<S, C>();
}
