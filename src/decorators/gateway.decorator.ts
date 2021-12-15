import { Controller, Flamework, Modding, Reflect, Service } from "@flamework/core";
import { RunService } from "@rbxts/services";

import { GUARDS_METADATA } from "../constants";
import { Constructor } from "../interfaces/constructor.interface";
import { CanActivate } from "../interfaces/features/can-activate.interface";
import { resolveCtor } from "../utils/constructor.utils";

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
	Reflect.defineMetadata(descriptor.object, `${GUARDS_METADATA}`, [
		...(Reflect.getMetadata<CanActivate[]>(descriptor.object, `${GUARDS_METADATA}`) || []),
		...(options?.guards?.map(ctor => resolveCtor(ctor)) || []),
	]);
	// Mark as controller or service for DI (hacky)
	if (RunService.IsServer()) {
		Reflect.defineMetadata(descriptor.object, Flamework.id<typeof Service>(), {});
	} else {
		Reflect.defineMetadata(descriptor.object, Flamework.id<typeof Controller>(), {});
	}
});
