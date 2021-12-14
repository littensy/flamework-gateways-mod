import { FunctionReturn } from "../function.type";

export type GatewayRequest<I extends any[] = any[], O extends defined = defined> = (...args: I) => Promise<O>;

export type GatewayRequests<T> = {
	[K in keyof T as FunctionReturn<T[K]> extends Promise<defined> ? K : never]: T[K];
};
