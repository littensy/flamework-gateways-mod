import { FunctionReturn } from "../function.type";

type EventReturnType = void | Promise<void>;

export type GatewayEvent<I extends any[] = any[]> = (...args: I) => EventReturnType;

export type GatewayEvents<T> = {
	[K in keyof T as FunctionReturn<T[K]> extends EventReturnType ? K : never]: T[K];
};
