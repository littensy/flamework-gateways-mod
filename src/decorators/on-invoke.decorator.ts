import { Modding, Reflect } from "@flamework/core";
import { RunService } from "@rbxts/services";

import { IS_ON_INVOKE_METADATA } from "../constants";
import { getServer } from "../create-server";
import { RemoteHandler } from "../helpers/remote-handler";

/**
 * Decorator that connects a method to a RemoteFunction instance.
 */
export const OnInvoke = Modding.createDecorator("Method", descriptor => {
	if (RunService.IsClient()) {
		throw `@Request decorator is not supported on the client.`;
	}
	const remote = getServer()._remote;
	const method = descriptor.object[descriptor.property as never] as Callback;
	const remoteHandler = new RemoteHandler(descriptor);

	remote.bindRequest(descriptor.property, (...initialArgs: unknown[]) => {
		const promise = new Promise((resolve, reject) => {
			remoteHandler.process(args => {
				if (args !== undefined) {
					resolve(method(descriptor.object, ...args));
				} else {
					reject(`A guard blocked request '${descriptor.property}'; An error will be thrown.`);
				}
			}, ...initialArgs);
		});
		return promise.expect();
	});
	Reflect.defineMetadata(descriptor.object, `${IS_ON_INVOKE_METADATA}.${descriptor.property}`, true);
});
