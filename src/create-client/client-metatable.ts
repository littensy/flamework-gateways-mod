import { Client } from "./client";

const createEmitter =
	(client: Client, name: string) =>
	(...args: never[]) => {
		client.emit(name as never, ...args);
	};

const createInvoker =
	(client: Client, name: string) =>
	(...args: never[]) => {
		return client.request(name as never, ...args);
	};

const createListener = (client: Client, name: string) => (listener: Callback) => {
	return client.on(name as never, listener);
};

export function initClientMetatable(client: Client) {
	const __index = (_: Client, key: unknown) => {
		if (!typeIs(key, "string")) {
			return;
		}
		const eventOrRequest = client._remote.getEvent(key) || client._remote.getRequest(key);
		if (eventOrRequest === undefined) {
			return createListener(client, key); // incoming
		} else if (eventOrRequest.IsA("RemoteFunction")) {
			return createInvoker(client, key); // outgoing
		} else if (eventOrRequest.IsA("RemoteEvent")) {
			return createEmitter(client, key); // outgoing
		}
	};
	setmetatable(Client as never, { __index });
}
