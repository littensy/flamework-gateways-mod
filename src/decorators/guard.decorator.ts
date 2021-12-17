import { Flamework, Modding } from "@flamework/core";

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
	Flamework.registerExternalClass(descriptor.object);
});
