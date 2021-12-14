import { ExecutionContext } from "./execution-context.interface";

/**
 * Interface describing implementation of a pipe. Return can be either
 * synchronous or asynchronous.
 */
export interface PipeTransform<T = any, R = any> {
	/**
	 * Method to implement a custom pipe.
	 * @param value Argument before it is received by the remote handler
	 * @param context Provides access to details about the current request
	 */
	transform(value: T, context: ExecutionContext): R | Promise<R>;
}
