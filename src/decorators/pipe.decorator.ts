import { Flamework, Modding, Reflect } from "@flamework/core";

import { PIPE_METADATA } from "../constants";

/**
 * Decorator that marks a class as a Gateway pipe. Used for dependency
 * injection.
 * @example UsePipes(MyPipe)
 */
export const Pipe = Modding.createDecorator("Class", descriptor => {
	Reflect.defineMetadata(descriptor.object, PIPE_METADATA, true);
	Flamework.registerExternalClass(descriptor.object);
});
