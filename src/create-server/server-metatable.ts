import { Server } from "./server";

const createEmitter =
	(server: Server, name: string) =>
	(players: Player | Player[], ...args: never[]) => {
		server.emit(name as never, players, ...args);
	};

// const createInvoker =
// 	(server: Server, name: string) =>
// 	(player: Player, ...args: unknown[]) => {
// 		return server.request(name as never, player, ...args);
// 	};

const createListener = (server: Server, name: string) => (listener: Callback) => {
	return server.on(name as never, listener);
};

export function initServerMetatable(server: Server) {
	const __index = (_: Server, key: unknown) => {
		if (!typeIs(key, "string")) {
			return;
		}
		const eventOrRequest = server._remote.getEvent(key) || server._remote.getRequest(key);
		if (eventOrRequest === undefined) {
			return createEmitter(server, key); // outgoing
		} else if (eventOrRequest.IsA("RemoteEvent")) {
			return createListener(server, key); // incoming
		}
	};
	setmetatable(Server as never, { __index });
}
