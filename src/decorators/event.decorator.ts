import { Modding } from "@flamework/core";

import { client, server } from "../connection";
import { callObjectProperty } from "../utils/call-object-property";

export const Event = Modding.createDecorator("Method", descriptor => {
	if (server) {
		server._connection.createEvent(descriptor.property, (...args) => {
			callObjectProperty(descriptor.object, descriptor.property, descriptor.object, ...args);
		});
	} else if (client) {
		client._connection.createEvent(descriptor.property, (...args) => {
			callObjectProperty(descriptor.object, descriptor.property, descriptor.object, ...args);
		});
	}
});
