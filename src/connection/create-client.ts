import { Client } from "../interfaces/client";
import { ClientGateway, ServerGateway } from "../interfaces/gateway";
import { ClientConnection } from "./client-connection";

export function createClient<
	S extends ServerGateway = ServerGateway,
	C extends ClientGateway = ClientGateway,
>(): Client<S, C> {
	const connection = new ClientConnection();
	const client = {
		_connection: connection,

		on(eventName: string, callback: Callback) {
			return connection.remoteEvent.OnClientEvent.Connect((name: string, ...args: unknown[]) => {
				if (name === eventName) {
					callback(...args);
				}
			});
		},

		send(eventName: string, ...args: unknown[]) {
			connection.fireServer(eventName, ...args);
		},

		request(eventName: string, ...args: unknown[]) {
			return connection.invokeServer(eventName, ...args);
		},
	} as Client<S, C>;

	createClientMethods(client, connection);

	return client;
}

function createClientMethods(client: Client, connection: ClientConnection) {
	const __index = (_self: Client, remoteName: unknown) => {
		if (!typeIs(remoteName, "string")) {
			return;
		}
		const remote = connection.getRemote(remoteName);

		if (remote?.IsA("RemoteEvent")) {
			return (...args: unknown[]) => {
				client.send(remoteName as never, ...(args as never[]));
			};
		} else if (remote?.IsA("RemoteFunction")) {
			return (...args: unknown[]) => {
				return client.request(remoteName as never, ...(args as never[]));
			};
		} else if (connection.events.has(remoteName)) {
			return (callback: Callback) => {
				return client.on(remoteName, callback);
			};
		} else {
			throw `Remote ${remoteName} is not a RemoteEvent or RemoteFunction`;
		}
	};
	setmetatable(client, { __index });
}
