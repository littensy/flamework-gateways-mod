import { ConnectionClientImpl } from "../interfaces/connection";
import { FunctionParameters, UnwrapFunctionReturn } from "../interfaces/function.type";
import { Gateway, GatewayEvents, GatewayRequests, OmitPlayerParameter } from "../interfaces/gateway";
import { ClientRemote } from "./client-remote";

export class Client<S extends Gateway = {}, C extends Gateway = {}> implements ConnectionClientImpl<S, C> {
	/** @hidden */
	readonly _remote = new ClientRemote();

	on<K extends keyof GatewayEvents<C>>(
		eventName: K,
		listener: (...args: FunctionParameters<GatewayEvents<C>[K]>) => void,
	): RBXScriptConnection {
		return this._remote
			.getClientEvent()
			.OnClientEvent.Connect((key: string, ...args: FunctionParameters<GatewayEvents<C>[K]>) => {
				if (key === eventName) {
					listener(...args);
				}
			});
	}

	async wait<K extends keyof GatewayEvents<C>>(eventName: K): Promise<FunctionParameters<GatewayEvents<C>[K]>> {
		return new Promise((resolve, _reject, onCancel) => {
			const connection = this.on(eventName, (...args: FunctionParameters<GatewayEvents<C>[K]>) => {
				connection.Disconnect();
				resolve(args);
			});
			onCancel(() => connection.Disconnect());
		});
	}

	emit<K extends keyof GatewayEvents<S>>(
		eventName: K,
		...args: FunctionParameters<OmitPlayerParameter<GatewayEvents<S>[K]>>
	): void {
		const event = this._remote.getEvent(eventName as string);
		if (!event) {
			throw `Event '${eventName}' does not exist on the server.`;
		}
		event.FireServer(...args);
	}

	async request<K extends keyof GatewayRequests<S>>(
		requestName: K,
		...args: FunctionParameters<OmitPlayerParameter<GatewayRequests<S>[K]>>
	): Promise<UnwrapFunctionReturn<GatewayRequests<S>[K]>> {
		const request = this._remote.getRequest(requestName as string);
		if (!request) {
			throw `Request '${requestName}' does not exist on the server.`;
		}
		return request.InvokeServer(...args) as UnwrapFunctionReturn<GatewayRequests<S>[K]>;
	}
}
