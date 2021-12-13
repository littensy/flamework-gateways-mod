import { Gateway, GatewayEvent } from "./gateway.interface";

export default undefined;

export type ClientGateway = Gateway<ClientGatewayEvent>;

export type ClientGatewayEvent<I extends any[] = any[]> = GatewayEvent<I>;
