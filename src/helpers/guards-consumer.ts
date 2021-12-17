import { isEmpty } from "@rbxts/object-utils";

import { ExecutionContext } from "../interfaces/features/execution-context.interface";
import { getGuardsForMethod } from "../utils/get-method-metadata.utils";

export class GuardsConsumer {
	async tryActivate(context: ExecutionContext): Promise<boolean> {
		const guards = getGuardsForMethod(context.getDescriptor());

		if (isEmpty(guards)) {
			return true;
		}

		for (const resolve of guards) {
			const result = resolve().canActivate(context);
			if (await result) {
				continue;
			}
			return false;
		}
		return true;
	}
}
