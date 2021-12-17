import { Flamework, Modding, Reflect } from "@flamework/core";

import { GUARDS_METADATA } from "../constants";
import { Constructor } from "../interfaces/constructor.interface";
import { CanActivate } from "../interfaces/features/can-activate.interface";
import { createGuardResolvers } from "./utils/create-guard-resolvers.util";

/**
 * Interface defining options that can be passed to `@Gateway()` decorator.
 */
export interface GatewayOptions {
	/**
	 * Specifies an optional list of guards to bind to the scope of the class.
	 */
	guards?: (CanActivate | Constructor<CanActivate>)[];
}

/**
 * Decorator that marks a class as a Flamework gateway that can receive inbound
 * requests and produce responses.
 */
export const Gateway = Modding.createDecorator<[options?: GatewayOptions]>("Class", (descriptor, [options]) => {
	if (options?.guards) {
		Reflect.defineMetadata(
			descriptor.object,
			GUARDS_METADATA,
			createGuardResolvers(descriptor.object, options.guards),
		);
	}
	Flamework.registerExternalClass(descriptor.object);
});
