import { Flamework, Modding } from "@flamework/core";

/**
 * Decorator that marks a class as a Gateway guard. Used for dependency
 * injection only.
 * @example UseGuards(Dependency(MyGuard))
 */
export const Guard = Modding.createDecorator("Class", descriptor => {
	Flamework.registerExternalClass(descriptor.object);
});
