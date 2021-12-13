import { Modding } from "@flamework/core";

import { client, server } from "../connection";
import { callObjectProperty } from "../utils/call-object-property";

export const Request = Modding.createDecorator("Method", descriptor => {
	if (server) {
		server._connection.createFunction(descriptor.property, (...args) => {
			const promise = callObjectProperty(descriptor.object, descriptor.property, descriptor.object, ...args);
			if (!Promise.is(promise)) {
				return promise;
			}
			const [status, value] = promise.awaitStatus();
			if (status === Promise.Status.Resolved) {
				return value;
			} else if (status === Promise.Status.Rejected) {
				throw value;
			} else {
				throw `The awaited Promise was cancelled (${descriptor.id})`;
			}
		});
	} else if (client) {
		throw `Client side RemoteFunctions are unsafe! (${descriptor.id})`;
	}
});
