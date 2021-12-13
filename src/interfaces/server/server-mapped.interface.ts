import {
	ClientGateway,
	ClientGatewayEvent,
	GatewayMemberParameters,
	ServerGateway,
	ServerGatewayMemberParameters,
} from "../gateway";

export default undefined;

type ServerSenderMap<C extends ClientGateway> = {
	[K in keyof C]: C[K] extends ClientGatewayEvent
		? (players: Player | Player[], ...args: GatewayMemberParameters<C[K]>) => void
		: never;
};

type ServerReceiverMap<S extends ServerGateway> = {
	[K in keyof S as ReturnType<S[K]> extends void | Promise<void> ? K : never]: (
		callback: (player: Player, ...args: ServerGatewayMemberParameters<S[K]>) => void,
	) => RBXScriptConnection;
};

export type ServerMapped<S extends ServerGateway, C extends ClientGateway> = ServerSenderMap<C> & ServerReceiverMap<S>;
