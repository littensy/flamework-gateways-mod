import { Reflect } from "@flamework/core";
import { MethodDescriptor } from "@flamework/core/out/modding";

import { IS_ON_EVENT_METADATA, IS_ON_INVOKE_METADATA } from "../constants";
import { Constructor } from "../interfaces/constructor.interface";
import { ExecutionContext } from "../interfaces/features/execution-context.interface";

export class ExecutionContextHost implements ExecutionContext {
	constructor(
		private readonly args: unknown[],
		private readonly descriptor: MethodDescriptor,
		private readonly player?: Player,
	) {}

	getClass<T = any>(): Constructor<T> {
		return this.descriptor.object as Constructor<T>;
	}

	getRemoteName(): string {
		return this.descriptor.property;
	}

	getRemoteType(): "event" | "invoke" {
		return Reflect.hasMetadata(this.descriptor.object, `${IS_ON_EVENT_METADATA}.${this.descriptor.property}`)
			? "event"
			: Reflect.hasMetadata(this.descriptor.object, `${IS_ON_INVOKE_METADATA}.${this.descriptor.property}`)
			? "invoke"
			: error(`Cannot get remote type for '${this.descriptor.property}'`);
	}

	getArgs<T extends any[] = any[]>(): T {
		return this.args as T;
	}

	getArgByIndex<T = any>(index: number): T {
		return this.args[index] as T;
	}

	getDescriptor() {
		return this.descriptor;
	}

	getPlayer() {
		if (!this.player) {
			throw `Cannot get player for '${this.descriptor.property}', a client event`;
		}
		return this.player;
	}
}
