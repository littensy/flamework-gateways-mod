import { ReplicatedStorage } from "@rbxts/services";

import { CLIENT_REMOTE_NAME, GATEWAY_CONTAINER_NAME } from "../constants";

export class ClientConnection {
	readonly container = ReplicatedStorage.WaitForChild(GATEWAY_CONTAINER_NAME) as Folder;
	readonly remoteEvent = this.container.WaitForChild(CLIENT_REMOTE_NAME) as RemoteEvent;

	readonly events = new Map<string, Callback>();

	constructor() {
		this.remoteEvent.OnClientEvent.Connect((name: string, ...args: unknown[]) => {
			const callback = this.events.get(name);
			if (callback) {
				callback(...args);
			} else {
				throw `Attempted to call remote ${name} but it doesn't exist`;
			}
		});
	}

	getRemote(name: string) {
		return this.container.FindFirstChild(name) as RemoteFunction | RemoteEvent | undefined;
	}

	fireServer(name: string, ...args: unknown[]) {
		const event = this.container.FindFirstChild(name) as RemoteEvent;
		if (!event || !event.IsA("RemoteEvent")) {
			throw `Attempted to fire event ${name} but it doesn't exist`;
		}
		event.FireServer(...args);
	}

	async invokeServer(name: string, ...args: unknown[]) {
		const request = this.container.FindFirstChild(name) as RemoteFunction;
		if (!request || !request.IsA("RemoteFunction")) {
			throw `Attempted to invoke function ${name} but it doesn't exist`;
		}
		return request.InvokeServer(...args);
	}

	createEvent(name: string, callback: (...args: unknown[]) => void) {
		if (this.events.has(name)) {
			throw `Remote ${name} already exists`;
		}
		this.events.set(name, callback);
	}
}
