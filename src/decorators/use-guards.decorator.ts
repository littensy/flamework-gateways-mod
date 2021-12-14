import { Modding, Reflect } from "@flamework/core";

import { GUARDS_METADATA } from "../constants";
import { Constructor } from "../interfaces/constructor.interface";
import { CanActivate } from "../interfaces/features/can-activate.interface";
import { resolveCtor } from "../utils/constructor.utils";

/**
 * Decorator that binds guards to the scope of a specific method. Will be run
 * after pipes. Guards can also be set up for every method in a class using the
 * `@Gateway()` decorator.
 *
 * @param guards A list of guard instances or classes.
 */
export const UseGuards = Modding.createDecorator<(CanActivate | Constructor<CanActivate>)[]>(
	"Method",
	(descriptor, guards) => {
		const id = `${GUARDS_METADATA}.${descriptor.property}`;
		Reflect.defineMetadata(descriptor.object, id, [
			...(Reflect.getMetadata<CanActivate[]>(descriptor.object, id) || []),
			...guards.map(ctor => resolveCtor(ctor)),
		]);
	},
);
