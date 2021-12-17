import { Modding, Reflect } from "@flamework/core";

import { GUARDS_METADATA } from "../constants";
import { Constructor } from "../interfaces/constructor.interface";
import { CanActivate } from "../interfaces/features/can-activate.interface";
import { createGuardResolvers } from "./utils/create-guard-resolvers.util";

export type Guard = CanActivate | Constructor<CanActivate>;

/**
 * Decorator that binds guards to the scope of a specific method. Will be run
 * after pipes. Guards can also be set up for every method in a class using the
 * `@Gateway()` decorator.
 *
 * @param guards A list of guard instances or classes.
 */
export const UseGuards = Modding.createDecorator<Guard[]>("Method", (descriptor, guards) => {
	Reflect.defineMetadata(
		descriptor.object,
		`${GUARDS_METADATA}.${descriptor.property}`,
		createGuardResolvers(descriptor.object, guards, descriptor.property),
	);
});
