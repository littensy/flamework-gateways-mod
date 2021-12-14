export type FunctionParameters<T> = T extends (...args: infer P) => unknown ? P : never;
export type FunctionReturn<T> = T extends (...args: never[]) => infer R ? R : never;
export type UnwrapFunctionReturn<T> = T extends (...args: never[]) => Promise<infer R> | infer R ? R : never;
