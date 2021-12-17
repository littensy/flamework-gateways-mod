import { Flamework, Modding, Reflect } from "@flamework/core";

import { GUARD_METADATA } from "../constants";

/**
 * Decorator that marks a class as a Gateway guard. Used for dependency
 * injection only.
 * @example
 * ```ts
 * const myGuard = Dependency(MyGuard);
 * ...
 * UseGuards(myGuard)
 * ```
 */
export const Guard = Modding.createDecorator("Class", descriptor => {
	Reflect.defineMetadata(descriptor.object, GUARD_METADATA, true);
	Flamework.registerExternalClass(descriptor.object);
});
