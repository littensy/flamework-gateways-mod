import Make from "@rbxts/make";
import { ReplicatedStorage } from "@rbxts/services";

import { EVENTS_FOLDER, REQUESTS_FOLDER, RESERVED_CLIENT_EVENT } from "../constants";
import { BindRemote } from "../interfaces/bind-remote.interface";

export class ServerRemote implements BindRemote {
	private readonly eventsFolder = Make("Folder", {
		Name: EVENTS_FOLDER,
		Parent: ReplicatedStorage,
		Children: [Make("RemoteEvent", { Name: RESERVED_CLIENT_EVENT })],
	});

	private readonly requestsFolder = Make("Folder", {
		Name: REQUESTS_FOLDER,
		Parent: ReplicatedStorage,
	});

	getEvents() {
		return this.eventsFolder.GetChildren() as RemoteEvent[];
	}

	getRequests() {
		return this.requestsFolder.GetChildren() as RemoteFunction[];
	}

	getEvent(name: string): RemoteEvent | undefined {
		return this.eventsFolder.FindFirstChild(name) as RemoteEvent;
	}

	getRequest(name: string): RemoteFunction | undefined {
		return this.requestsFolder.FindFirstChild(name) as RemoteFunction;
	}

	getClientEvent(): RemoteEvent {
		return this.eventsFolder.FindFirstChild(RESERVED_CLIENT_EVENT) as RemoteEvent;
	}

	bindEvent(name: string, callback: Callback): RBXScriptConnection {
		if (this.eventsFolder.FindFirstChild(name)) {
			throw `Event '${name}' cannot have duplicate implementations`;
		}
		const event =
			(this.eventsFolder.FindFirstChild(name) as RemoteEvent) ??
			Make("RemoteEvent", { Name: name, Parent: this.eventsFolder });

		return event.OnServerEvent.Connect(callback);
	}

	bindRequest(name: string, callback: Callback) {
		if (this.requestsFolder.FindFirstChild(name)) {
			throw `Request '${name}' cannot have duplicate implementations`;
		}
		const request =
			(this.requestsFolder.FindFirstChild(name) as RemoteFunction) ??
			Make("RemoteFunction", { Name: name, Parent: this.requestsFolder });

		request.OnServerInvoke = callback;
	}
}
