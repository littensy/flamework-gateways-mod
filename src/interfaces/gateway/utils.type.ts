import { GatewayMember } from "./gateway.interface";
import { ServerGatewayEvent, ServerGatewayFunction } from "./server-gateway.interface";

export default undefined;

export type GatewayMemberParameters<T extends GatewayMember> = Parameters<OmitThisParameter<T>>;

export type ServerGatewayMemberParameters<T extends ServerGatewayEvent | ServerGatewayFunction | never> = T extends (
	this: any,
	player: Player,
	...args: infer U
) => any
	? U
	: never;

export type ServerGatewayMemberReturnType<T extends ServerGatewayEvent | ServerGatewayFunction> = T extends (
	this: any,
	player: Player,
	...args: any[]
) => infer U
	? U
	: never;
