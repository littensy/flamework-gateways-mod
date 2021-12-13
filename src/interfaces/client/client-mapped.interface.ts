import {
	ClientGateway,
	GatewayMemberParameters,
	ServerGateway,
	ServerGatewayEvents,
	ServerGatewayFunctions,
	ServerGatewayMemberParameters,
	ServerGatewayMemberReturnType,
} from "../gateway";

export default undefined;

type ClientSenderEventMap<S extends ServerGateway> = {
	[K in keyof ServerGatewayEvents<S>]: (...args: ServerGatewayMemberParameters<ServerGatewayEvents<S>[K]>) => void;
};

type ClientSenderFunctionMap<S extends ServerGateway> = {
	[K in keyof ServerGatewayFunctions<S>]: (
		...args: ServerGatewayMemberParameters<ServerGatewayFunctions<S>[K]>
	) => ServerGatewayMemberReturnType<ServerGatewayFunctions<S>[K]>;
};

type ClientSenderMap<S extends ServerGateway> = ClientSenderEventMap<S> & ClientSenderFunctionMap<S>;

type ClientReceiverMap<C extends ClientGateway> = {
	[K in keyof C]: (callback: (...args: GatewayMemberParameters<C[K]>) => void) => RBXScriptConnection;
};

export type ClientGatewayEvents<T extends ClientGateway> = {
	[K in keyof T as ReturnType<T[K]> extends void | Promise<void> ? K : never]: T[K];
};

export type ClientMapped<S extends ServerGateway, C extends ClientGateway> = ClientSenderMap<S> & ClientReceiverMap<C>;
