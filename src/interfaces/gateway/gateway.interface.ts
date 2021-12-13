export default undefined;

export type Gateway<T extends GatewayMember = GatewayMember> = Record<string, T>;

export type GatewayEvent<I extends any[] = any[]> = (this: Gateway, ...args: I) => void | Promise<void>;

export type GatewayFunction<I extends any[] = any[], O = unknown> = (this: Gateway, ...args: I) => Promise<O>;

export type GatewayMember = GatewayEvent | GatewayFunction;
