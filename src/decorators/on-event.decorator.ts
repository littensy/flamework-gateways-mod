import { Modding, Reflect } from "@flamework/core";
import { RunService } from "@rbxts/services";

import { IS_ON_EVENT_METADATA } from "../constants";
import { getClient } from "../create-client";
import { getServer } from "../create-server";
import { RemoteHandler } from "../helpers/remote-handler";

/**
 * Decorator that connects a method to a RemoteEvent instance.
 */
export const OnEvent = Modding.createDecorator("Method", descriptor => {
	const remote = RunService.IsClient() ? getClient()._remote : getServer()._remote;
	const method = descriptor.object[descriptor.property as never] as Callback;
	const remoteHandler = new RemoteHandler(descriptor);

	remote.bindEvent(descriptor.property, (...initialArgs: unknown[]) => {
		remoteHandler
			.process(args => {
				if (args !== undefined) {
					method(descriptor.object, ...args);
				}
			}, ...initialArgs)
			.catch(err => warn(`Error in event handler: ${err}`));
	});
	Reflect.defineMetadata(descriptor.object, `${IS_ON_EVENT_METADATA}.${descriptor.property}`, true);
});
