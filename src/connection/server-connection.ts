import Make from "@rbxts/make";
import { ReplicatedStorage } from "@rbxts/services";

import { CLIENT_REMOTE_NAME, GATEWAY_CONTAINER_NAME } from "../constants";

export class ServerConnection {
	readonly container = Make("Folder", {
		Name: GATEWAY_CONTAINER_NAME,
		Parent: ReplicatedStorage,
	});
	readonly clientRemote = Make("RemoteEvent", {
		Name: CLIENT_REMOTE_NAME,
		Parent: this.container,
	});

	fireClient(name: string, player: Player, ...args: unknown[]) {
		this.clientRemote.FireClient(player, name, ...args);
	}

	fireAllClients(name: string, ...args: unknown[]) {
		this.clientRemote.FireAllClients(name, ...args);
	}

	getRemote<T extends RemoteEvent | RemoteFunction>(name: string): T | undefined {
		return this.container.FindFirstChild(name) as T;
	}

	createEvent(name: string, callback: (...args: unknown[]) => void) {
		if (this.getRemote(name)) {
			throw `Remote ${name} already exists`;
		}
		const event = Make("RemoteEvent", {
			Name: name,
			Parent: this.container,
		});
		event.OnServerEvent.Connect(callback);
	}

	createFunction(name: string, callback: (...args: unknown[]) => unknown) {
		if (this.getRemote(name)) {
			throw `Remote ${name} already exists`;
		}
		const event = Make("RemoteFunction", {
			Name: name,
			Parent: this.container,
		});
		event.OnServerInvoke = callback;
	}
}
