import { Reflect } from "@flamework/core";
import Object from "@rbxts/object-utils";

import { PIPE_METADATA, PIPES_METADATA } from "../../constants";
import { Constructor } from "../../interfaces/constructor.interface";
import { PipeTransform } from "../../interfaces/features";
import { PipeResolver } from "../../interfaces/resolver.type";
import { isArray } from "../../utils/array.utils";
import { isCtor } from "../../utils/constructor.utils";
import { resolveDependency } from "../../utils/resolve-dependency.util";
import { ParamPipe } from "../use-pipes.decorator";

export function createPipeResolvers(object: object, paramPipes: ParamPipe[], property: string): PipeResolver[][] {
	const id = `${PIPES_METADATA}.${property}`;
	const pipeResolvers = [...(Reflect.getMetadata<PipeResolver[][]>(object, id) || [])];

	for (const [key, Pipes] of Object.entries(paramPipes)) {
		// Object.entries will not be zero-indexed
		if (!Pipes) {
			continue;
		} else if (isArray(Pipes)) {
			pipeResolvers[key - 1] = [...(pipeResolvers[key - 1] || []), ...Pipes.map(createPipeResolver)];
		} else {
			pipeResolvers[key - 1] = [...(pipeResolvers[key - 1] || []), createPipeResolver(Pipes)];
		}
	}
	Reflect.defineMetadata(object, id, pipeResolvers);
	return pipeResolvers;
}

function createPipeResolver(Pipe: PipeTransform | Constructor<PipeTransform>): PipeResolver {
	if (isCtor(Pipe)) {
		if (Reflect.hasMetadata(Pipe, PIPE_METADATA)) {
			return () => {
				const instance = resolveDependency<PipeTransform>(Pipe);
				if (!instance) {
					throw `Failed to resolve Pipe singleton; Pipes should be ignited by Flamework`;
				}
				return instance;
			};
		} else {
			const instance = new Pipe();
			return () => instance;
		}
	} else {
		return () => Pipe;
	}
}
