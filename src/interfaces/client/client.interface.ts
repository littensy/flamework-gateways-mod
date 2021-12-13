import { ClientConnection } from "../../connection/client-connection";
import {
	ClientGateway,
	GatewayMemberParameters,
	ServerGateway,
	ServerGatewayEvents,
	ServerGatewayFunctions,
	ServerGatewayMemberParameters,
	ServerGatewayMemberReturnType,
} from "../gateway";
import { ClientMapped } from "./client-mapped.interface";

export default undefined;

interface IClient<S extends ServerGateway, C extends ClientGateway> {
	on<K extends keyof C>(
		eventName: K,
		callback: (...args: GatewayMemberParameters<C[K]>) => void,
	): RBXScriptConnection;

	send<K extends keyof ServerGatewayEvents<S>>(
		eventName: K,
		...args: ServerGatewayMemberParameters<ServerGatewayEvents<S>[K]>
	): void;

	request<K extends keyof ServerGatewayFunctions<S>>(
		eventName: K,
		...args: ServerGatewayMemberParameters<ServerGatewayFunctions<S>[K]>
	): Promise<ServerGatewayMemberReturnType<ServerGatewayFunctions<S>[K]>>;
}

export type Client<S extends ServerGateway = ServerGateway, C extends ClientGateway = ClientGateway> = IClient<S, C> &
	ClientMapped<S, C> & {
		/** @hidden */
		_connection: ClientConnection;
	};
