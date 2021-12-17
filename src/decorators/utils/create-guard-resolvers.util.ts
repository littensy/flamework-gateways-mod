import { Reflect } from "@flamework/core";

import { GUARD_METADATA, GUARDS_METADATA } from "../../constants";
import { CanActivate } from "../../interfaces/features";
import { GuardResolver } from "../../interfaces/resolver.type";
import { isCtor } from "../../utils/constructor.utils";
import { resolveDependency } from "../../utils/resolve-dependency.util";
import { Guard } from "../use-guards.decorator";

export function createGuardResolvers(object: object, guards: Guard[], property?: string): Array<GuardResolver> {
	const id = property ? `${GUARDS_METADATA}.${property}` : GUARDS_METADATA;
	const guardResolvers = [
		...(Reflect.getMetadata<GuardResolver[]>(object, id) || []),
		...guards.map(createGuardResolver),
	];
	Reflect.defineMetadata(object, id, guardResolvers);
	return guardResolvers;
}

function createGuardResolver(Guard: Guard): GuardResolver {
	if (isCtor(Guard)) {
		if (Reflect.hasMetadata(Guard, GUARD_METADATA)) {
			return () => {
				const instance = resolveDependency<CanActivate>(Guard);
				if (!instance) {
					throw `Failed to resolve Guard singleton; Guards should be ignited by Flamework`;
				}
				return instance;
			};
		} else {
			const instance = new Guard();
			return () => instance;
		}
	} else {
		return () => Guard;
	}
}
