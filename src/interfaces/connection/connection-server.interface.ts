import { BindRemote } from "../bind-remote.interface";
import { FunctionParameters } from "../function.type";
import { Gateway, GatewayEvents } from "../gateway";

/**
 * Bridge client and server gateways.
 */
export type ConnectionServer<S extends Gateway = {}, C extends Gateway = {}> = ConnectionServerImpl<S, C> &
	Sender<C> &
	Receiver<S>;

type Sender<C extends Gateway> = {
	[K in keyof GatewayEvents<C>]: (
		players: Player | Player[],
		...args: FunctionParameters<GatewayEvents<C>[K]>
	) => void;
};

type Receiver<S extends Gateway> = {
	[K in keyof GatewayEvents<S>]: (
		listener: (...args: FunctionParameters<GatewayEvents<S>[K]>) => void,
	) => RBXScriptConnection;
};

export interface ConnectionServerImpl<S extends Gateway, C extends Gateway> {
	/** @hidden */
	readonly _remote: BindRemote;

	/**
	 * Subscribes to incoming emissions.
	 * @param event The event to subscribe to.
	 * @param listener The listener to call when the event is emitted.
	 * @returns RBXScriptConnection
	 * @throws If the event is not defined on the incoming gateway.
	 */
	on<K extends keyof GatewayEvents<S>>(
		eventName: K,
		listener: (...args: FunctionParameters<GatewayEvents<S>[K]>) => void,
	): RBXScriptConnection;

	/**
	 * Returns a Promise that resolves with the parameters of the next incoming emission.
	 * @param eventName The name of the event to listen for.
	 * @returns A Promise that resolves with the parameters of the next incoming emission.
	 * @throws If the event is not defined on the incoming gateway.
	 */
	wait<K extends keyof GatewayEvents<S>>(eventName: K): Promise<FunctionParameters<GatewayEvents<S>[K]>>;

	/**
	 * Emits an event to the given players.
	 * @param players The players to emit to.
	 * @param eventName The name of the event to emit.
	 * @param args The arguments to pass to the event.
	 * @returns A promise that resolves when the event has been emitted.
	 */
	emit<K extends keyof GatewayEvents<C>>(
		eventName: K,
		players: Player | Player[],
		...args: FunctionParameters<GatewayEvents<C>[K]>
	): void;

	/**
	 * Broadcasts an event to every player.
	 * @param eventName The name of the event to emit.
	 * @param args The arguments to pass to the event.
	 * @returns A promise that resolves when the event has been emitted.
	 */
	broadcast<K extends keyof GatewayEvents<C>>(eventName: K, ...args: FunctionParameters<GatewayEvents<C>[K]>): void;
}
