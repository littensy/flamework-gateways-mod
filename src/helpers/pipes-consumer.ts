import Object from "@rbxts/object-utils";

import { ExecutionContext } from "../interfaces/features/execution-context.interface";
import { getPipesForMethod } from "../utils/get-method-metadata.utils";

export class PipesConsumer {
	async applyPipes(context: ExecutionContext) {
		const transforms = getPipesForMethod(context.getDescriptor());
		const args = context.getArgs();

		for (const [index, value] of Object.entries(args)) {
			// Object.entries will not be zero-indexed
			const transform = transforms[index - 1];
			if (!transform) {
				continue;
			}
			args[index - 1] = await transform.reduce(async (deferredValue, pipe) => {
				const val = await deferredValue;
				const result = pipe.transform(val, context);
				return result;
			}, Promise.resolve(value));
		}
		return args;
	}
}
