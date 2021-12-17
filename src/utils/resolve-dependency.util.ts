import { Flamework, Reflect } from "@flamework/core";

export function resolveDependency(object: object) {
	const id = Reflect.objToId.get(object);
	return id ? Flamework.resolveDependency(id) : undefined;
}
