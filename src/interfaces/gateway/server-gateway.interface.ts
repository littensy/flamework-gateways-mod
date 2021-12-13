import { Gateway, GatewayEvent, GatewayFunction } from "./gateway.interface";

export default undefined;

export type ServerGateway = Gateway<ServerGatewayMember>;

export type ServerGatewayEvent<I extends [Player, ...any[]] = [Player, ...any[]]> = GatewayEvent<I>;

export type ServerGatewayFunction<
	I extends [Player, ...any[]] = [Player, ...any[]],
	O extends defined = defined,
> = GatewayFunction<I, O>;

export type ServerGatewayMember = ServerGatewayEvent | ServerGatewayFunction;

export type ServerGatewayEvents<T extends ServerGateway> = {
	[K in keyof T as ReturnType<T[K]> extends void | Promise<void> ? K : never]: T[K];
};

export type ServerGatewayFunctions<T extends ServerGateway> = {
	[K in keyof T as ReturnType<T[K]> extends Promise<defined> ? K : never]: T[K];
};
