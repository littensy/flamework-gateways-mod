import { ReplicatedStorage } from "@rbxts/services";

import { EVENTS_FOLDER, REQUESTS_FOLDER, RESERVED_CLIENT_EVENT } from "../constants";
import { BindRemote } from "../interfaces/bind-remote.interface";

export class ClientRemote implements BindRemote {
	private readonly eventsFolder = ReplicatedStorage.WaitForChild(EVENTS_FOLDER) as Folder;
	private readonly requestsFolder = ReplicatedStorage.WaitForChild(REQUESTS_FOLDER) as Folder;

	private readonly eventHandlerMap = new Map<string, (...args: unknown[]) => unknown>();

	constructor() {
		this.getClientEvent().OnClientEvent.Connect((eventName: string, ...args: unknown[]) => {
			const handler = this.eventHandlerMap.get(eventName);
			if (handler) {
				handler(...args);
			} else {
				throw `Server attempted to emit event '${eventName}' but no handler was found`;
			}
		});
	}

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

	bindEvent(name: string, callback: Callback) {
		if (this.eventHandlerMap.has(name)) {
			throw `Event '${name}' cannot have duplicate implementations`;
		}
		this.eventHandlerMap.set(name, callback);
	}

	bindRequest() {
		throw `Client-side requests are not supported`;
	}
}
