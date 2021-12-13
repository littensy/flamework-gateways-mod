import { ServerConnection } from "../../connection/server-connection";
import {
	ClientGateway,
	GatewayMemberParameters,
	ServerGateway,
	ServerGatewayEvents,
	ServerGatewayMemberParameters,
} from "../gateway";
import { ServerMapped } from "./server-mapped.interface";

export default undefined;

interface IServer<S extends ServerGateway, C extends ClientGateway> {
	on<K extends keyof ServerGatewayEvents<S>>(
		eventName: K,
		callback: (...args: ServerGatewayMemberParameters<ServerGatewayEvents<S>[K]>) => void,
	): RBXScriptConnection;

	send<K extends keyof C>(eventName: K, players: Player | Player[], ...args: GatewayMemberParameters<C[K]>): void;

	filteredSend<K extends keyof C>(
		eventName: K,
		predicate: (player: Player, index: number, players: readonly Player[]) => boolean,
		...args: GatewayMemberParameters<C[K]>
	): void;

	broadcast<K extends keyof C>(eventName: K, ...args: GatewayMemberParameters<C[K]>): void;
}

export type Server<S extends ServerGateway = ServerGateway, C extends ClientGateway = ClientGateway> = IServer<S, C> &
	ServerMapped<S, C> & {
		/** @hidden */
		_connection: ServerConnection;
	};
