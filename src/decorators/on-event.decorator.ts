import { Modding, Reflect } from "@flamework/core";
import { RunService } from "@rbxts/services";

import { IS_ON_EVENT_METADATA } from "../constants";
import { getClient } from "../create-client";
import { getServer } from "../create-server";
import { RemoteHandler } from "../helpers/remote-handler";
import { resolveDependency } from "../utils/resolve-dependency.util";

/**
 * Decorator that connects a method to a RemoteEvent instance.
 */
export const OnEvent = Modding.createDecorator("Method", descriptor => {
	const remote = RunService.IsClient() ? getClient()._remote : getServer()._remote;
	const method = descriptor.object[descriptor.property as never] as Callback;
	const remoteHandler = new RemoteHandler(descriptor);

	remote.bindEvent(descriptor.property, (...initialArgs: unknown[]) => {
		const instance = resolveDependency(descriptor.object);

		if (!instance) {
			throw [
				`Could not resolve dependency for parent class of ${descriptor.property};`,
				`Was a remote fired before calling Flamework.ignite?`,
			].join(" ");
		}
		remoteHandler
			.process(args => {
				if (args !== undefined) {
					method(instance, ...args);
				}
			}, ...initialArgs)
			.catch(err => warn(err));
	});
	Reflect.defineMetadata(descriptor.object, `${IS_ON_EVENT_METADATA}.${descriptor.property}`, true);
});
