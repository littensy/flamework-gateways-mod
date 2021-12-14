import { BindRemote } from "../bind-remote.interface";
import { FunctionParameters, FunctionReturn, UnwrapFunctionReturn } from "../function.type";
import { Gateway, GatewayEvents, GatewayRequests, OmitPlayerParameter } from "../gateway";

/**
 * Bridge server and client gateways.
 */
export type ConnectionClient<S extends Gateway = {}, C extends Gateway = {}> = ConnectionClientImpl<S, C> &
	Sender<S> &
	Receiver<C>;

type Sender<S extends Gateway> = {
	[K in keyof GatewayEvents<S>]: (...args: FunctionParameters<OmitPlayerParameter<GatewayEvents<S>[K]>>) => void;
} & {
	[K in keyof GatewayRequests<S>]: (
		...args: FunctionParameters<OmitPlayerParameter<GatewayRequests<S>[K]>>
	) => FunctionReturn<GatewayRequests<S>[K]>;
};

type Receiver<C extends Gateway> = {
	[K in keyof GatewayEvents<C>]: (
		listener: (...args: FunctionParameters<GatewayEvents<C>[K]>) => void,
	) => RBXScriptConnection;
};

export interface ConnectionClientImpl<S extends Gateway, C extends Gateway> {
	/** @hidden */
	readonly _remote: BindRemote;

	/**
	 * Subscribes to incoming emissions.
	 * @param event The event to subscribe to.
	 * @param listener The listener to call when the event is emitted.
	 * @returns RBXScriptConnection
	 * @throws If the event is not defined on the incoming gateway.
	 */
	on<K extends keyof GatewayEvents<C>>(
		eventName: K,
		listener: (...args: FunctionParameters<GatewayEvents<C>[K]>) => void,
	): RBXScriptConnection;

	/**
	 * Returns a Promise that resolves with the parameters of the next incoming emission.
	 * @param eventName The name of the event to listen for.
	 * @returns A Promise that resolves with the parameters of the next incoming emission.
	 * @throws If the event is not defined on the incoming gateway.
	 */
	wait<K extends keyof GatewayEvents<C>>(eventName: K): Promise<FunctionParameters<GatewayEvents<C>[K]>>;

	/**
	 * Emits an event to the server.
	 * @param eventName The name of the event to emit.
	 * @param args The arguments to pass to the event.
	 * @returns A promise that resolves when the event has been emitted.
	 * @throws If the event is not defined on the outgoing gateway.
	 */
	emit<K extends keyof GatewayEvents<S>>(
		eventName: K,
		...args: FunctionParameters<OmitPlayerParameter<GatewayEvents<S>[K]>>
	): void;

	/**
	 * Requests a value from the server.
	 * @param requestName The name of the request.
	 * @param args The arguments to pass to the request.
	 * @returns A promise that resolves to the return value of the request.
	 * @throws If the request is not defined on the outgoing gateway.
	 */
	request<K extends keyof GatewayRequests<S>>(
		requestName: K,
		...args: FunctionParameters<OmitPlayerParameter<GatewayRequests<S>[K]>>
	): Promise<UnwrapFunctionReturn<GatewayRequests<S>[K]>>;
}
