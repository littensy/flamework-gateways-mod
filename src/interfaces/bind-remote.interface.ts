export interface BindRemote {
	getEvents(): RemoteEvent[];
	getRequests(): RemoteFunction[];

	getEvent(name: string): RemoteEvent | undefined;
	getRequest(name: string): RemoteFunction | undefined;
	getClientEvent(name: string): RemoteEvent | undefined;

	bindEvent(name: string, callback: Callback): void;
	bindRequest(name: string, callback: Callback): void;
}
