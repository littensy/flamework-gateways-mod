import { Reflect } from "@flamework/core";

export function extendMetadata<T extends any[]>(obj: object, key: string, value: T) {
	const previousValue = Reflect.getMetadata<T>(obj, key) || [];
	Reflect.defineMetadata(obj, key, [...previousValue, ...value]);
}
