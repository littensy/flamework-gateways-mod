import { Modding, Reflect } from "@flamework/core";

import { PIPES_METADATA } from "../constants";
import { Constructor } from "../interfaces/constructor.interface";
import { PipeTransform } from "../interfaces/features/pipe-transform.interface";
import { createPipeResolvers } from "./utils/create-pipe-resolvers.util";

export type ParamPipe =
	| PipeTransform
	| Constructor<PipeTransform>
	| Array<PipeTransform | Constructor<PipeTransform>>
	| undefined;

/**
 * Decorator that binds pipes to the parameters of a method. For example,
 * `@UsePipes(undefined, PipeB)` binds PipeB to the second parameter.
 *
 * @param pipes A list of pipe instances or classes to apply to their respective
 * parameters.
 */
export const UsePipes = Modding.createDecorator<ParamPipe[]>("Method", (descriptor, paramPipes) => {
	Reflect.defineMetadata(
		descriptor.object,
		`${PIPES_METADATA}.${descriptor.property}`,
		createPipeResolvers(descriptor.object, paramPipes, descriptor.property),
	);
});
