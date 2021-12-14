import { Modding, Reflect } from "@flamework/core";
import Object from "@rbxts/object-utils";

import { PIPES_METADATA } from "../constants";
import { Constructor } from "../interfaces/constructor.interface";
import { PipeTransform } from "../interfaces/features/pipe-transform.interface";
import { isArray } from "../utils/array.utils";
import { resolveCtor } from "../utils/constructor.utils";

/**
 * Decorator that binds pipes to the parameters of a method. For example,
 * `@UsePipes(undefined, PipeB)` binds PipeB to the second parameter.
 *
 * @param pipes A list of pipe instances or classes to apply to their respective
 * parameters.
 */
export const UsePipes = Modding.createDecorator<
	(PipeTransform | Constructor<PipeTransform> | (PipeTransform | Constructor<PipeTransform>)[] | undefined)[]
>("Method", (descriptor, value) => {
	const id = `${PIPES_METADATA}.${descriptor.property}`;
	const pipeMetadata = [...(Reflect.getMetadata<(PipeTransform[] | undefined)[]>(descriptor.object, id) || [])];

	for (const [index, pipes] of Object.entries(value)) {
		// Object.entries will not be zero-indexed
		if (!pipes) {
			continue;
		} else if (isArray(pipes)) {
			pipeMetadata[index - 1] = [...(pipeMetadata[index] || []), ...pipes.map(ctor => resolveCtor(ctor))];
		} else {
			pipeMetadata[index - 1] = [...(pipeMetadata[index] || []), resolveCtor(pipes)];
		}
	}
	Reflect.defineMetadata(descriptor.object, id, pipeMetadata);
});
