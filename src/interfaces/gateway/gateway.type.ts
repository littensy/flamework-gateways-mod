export type Gateway = object;

export type OmitPlayerParameters<T extends Gateway> = {
	[K in keyof T]: T[K] extends (player: Player, ...args: infer A) => infer R ? (...args: A) => R : never;
};

export type OmitPlayerParameter<F> = F extends (player: Player, ...args: infer A) => infer R
	? (...args: A) => R
	: never;
