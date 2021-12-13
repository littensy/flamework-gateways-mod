import { Players } from "@rbxts/services";

import { ClientGateway, ServerGateway } from "../interfaces/gateway";
import { Server } from "../interfaces/server";
import { ServerConnection } from "./server-connection";

export function createServer<
	S extends ServerGateway = ServerGateway,
	C extends ClientGateway = ClientGateway,
>(): Server<S, C> {
	const connection = new ServerConnection();
	const server = {
		_connection: connection,

		on(eventName: string, callback: Callback) {
			const remote = connection.getRemote<RemoteEvent>(eventName);
			if (!remote) {
				throw `Event "${eventName}" not found`;
			}
			return remote.OnServerEvent.Connect(callback);
		},

		send(eventName: string, players, ...args: unknown[]) {
			if (typeIs(players, "Instance")) {
				connection.fireClient(eventName, players, ...args);
			} else {
				for (const player of players) {
					connection.fireClient(eventName, player, ...args);
				}
			}
		},

		filteredSend(eventName: string, predicate, ...args: unknown[]) {
			for (const player of Players.GetPlayers().filter(predicate)) {
				connection.fireClient(eventName, player, ...args);
			}
		},

		broadcast(eventName: string, ...args: unknown[]) {
			connection.fireAllClients(eventName, ...args);
		},
	} as Server<S, C>;

	createServerMethods(server as never, connection);

	return server;
}

function createServerMethods(server: Server, connection: ServerConnection) {
	const __index = (_self: Server, remoteName: unknown) => {
		if (!typeIs(remoteName, "string")) {
			return;
		}
		const remote = connection.getRemote(remoteName);

		if (remote?.IsA("RemoteEvent")) {
			return (callback: Callback) => {
				return server.on(remoteName as never, callback);
			};
		} else {
			return (players: Player | Player[], ...args: unknown[]) => {
				server.send(remoteName, players, ...args);
			};
		}
	};
	setmetatable(server, { __index });
}
