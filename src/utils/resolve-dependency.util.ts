import { Flamework, Reflect } from "@flamework/core";

export function resolveDependency<T>(object: object): T | undefined {
	const id = Reflect.objToId.get(object);
	return id ? (Flamework.resolveDependency(id) as T) : undefined;
}
