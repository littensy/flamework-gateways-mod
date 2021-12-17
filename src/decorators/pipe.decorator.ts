import { Flamework, Modding } from "@flamework/core";

/**
 * Decorator that marks a class as a Gateway pipe. Used for dependency
 * injection only.
 * @example
 * ```ts
 * const myPipe = Dependency(MyPipe);
 * ...
 * UsePipes(myPipe)
 * ```
 */
export const Pipe = Modding.createDecorator("Class", descriptor => {
	Flamework.registerExternalClass(descriptor.object);
});
