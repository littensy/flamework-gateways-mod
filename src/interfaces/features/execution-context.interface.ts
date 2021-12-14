import { MethodDescriptor } from "@flamework/core/out/modding";

import { Constructor } from "../constructor.interface";

export default undefined;

/**
 * Provides methods for retrieving information being passed to the handler.
 * 'Remote' refers to an event or request defined in a Gateway.
 */
export interface ExecutionContext {
	/**
	 * Returns the *type* of the controller class which the current remote belongs to.
	 */
	getClass<T = any>(): Constructor<T>;
	/**
	 * Returns a reference to the Player who made the request, if on the server.
	 */
	getPlayer(): Player;
	/**
	 * Returns the Flamework descriptor of the current remote.
	 */
	getDescriptor(): Readonly<MethodDescriptor>;
	/**
	 * Returns the name of the current remote.
	 */
	getRemoteName(): string;
	/**
	 * Returns the type of the current remote.
	 * @returns 'event' if a RemoteEvent, or 'invoke' if a RemoteFunction
	 */
	getRemoteType(): "event" | "invoke";
	/**
	 * Returns the array of arguments being passed to the remote.
	 */
	getArgs<T extends any[] = unknown[]>(): T;
	/**
	 * Returns a particular argument by index.
	 * @param index Index of argument to retrieve
	 */
	getArgByIndex<T = any>(index: number): T;
}
