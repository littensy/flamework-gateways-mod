import { ConnectionServer } from "../interfaces/connection";
import { FunctionParameters } from "../interfaces/function.type";
import { Gateway, GatewayEvents } from "../interfaces/gateway";
import { ServerRemote } from "./server-remote";

export class Server<S extends Gateway, C extends Gateway> implements ConnectionServer<S, C> {
	/** @hidden */
	readonly _remote = new ServerRemote();

	on<K extends keyof GatewayEvents<S>>(
		eventName: K,
		listener: (...args: FunctionParameters<GatewayEvents<S>[K]>) => void,
	): RBXScriptConnection {
		const event = this._remote.getEvent(eventName as string);
		if (!event) {
			throw `Event '${eventName}' does not exist on the server.`;
		}
		return event.OnServerEvent.Connect(listener as never);
	}

	async wait<K extends keyof GatewayEvents<S>>(eventName: K): Promise<FunctionParameters<GatewayEvents<S>[K]>> {
		return new Promise((resolve, _reject, onCancel) => {
			const connection = this.on(eventName, (...args: FunctionParameters<GatewayEvents<S>[K]>) => {
				connection.Disconnect();
				resolve(args);
			});
			onCancel(() => connection.Disconnect());
		});
	}

	emit<K extends keyof GatewayEvents<C>>(
		eventName: K,
		players: Player | Player[],
		...args: FunctionParameters<GatewayEvents<C>[K]>
	): void {
		if (typeIs(players, "Instance")) {
			this._remote.getClientEvent().FireClient(players, eventName, ...args);
		} else {
			for (const player of players) {
				this._remote.getClientEvent().FireClient(player, eventName, ...args);
			}
		}
	}

	broadcast<K extends keyof GatewayEvents<C>>(eventName: K, ...args: FunctionParameters<GatewayEvents<C>[K]>): void {
		this._remote.getClientEvent().FireAllClients(eventName, ...args);
	}
}
