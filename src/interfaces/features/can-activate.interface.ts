import { ExecutionContext } from "./execution-context.interface";

/**
 * Interface defining the `canActivate()` function that must be implemented by
 * a guard. Return value indicates whether or not the current request is
 * allowed to proceed. Return can be either synchronous (`boolean`) or
 * asynchronous (`Promise`).
 */
export interface CanActivate {
	/**
	 * Method to block an invalid request.
	 * @param context Provides access to details about the current request
	 * @returns Whether or not the current request is allowed to proceed
	 */
	canActivate(context: ExecutionContext): boolean | Promise<boolean>;
}
