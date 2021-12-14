import { MethodDescriptor } from "@flamework/core/out/modding";
import { RunService } from "@rbxts/services";

import { ExecutionContextHost } from "./execution-context-host";
import { GuardsConsumer } from "./guards-consumer";
import { PipesConsumer } from "./pipes-consumer";

export class RemoteHandler {
	private readonly guardsConsumer = new GuardsConsumer();
	private readonly pipesConsumer = new PipesConsumer();

	constructor(private readonly descriptor: MethodDescriptor) {}

	async process(callback: (args?: unknown[]) => void, ...initialArgs: unknown[]) {
		const player = RunService.IsServer() ? (initialArgs[0] as Player) : undefined;
		const context = new ExecutionContextHost(initialArgs, this.descriptor, player);
		const args = await this.pipesConsumer.applyPipes(context);
		const canActivate = await this.guardsConsumer.tryActivate(context);
		if (canActivate) {
			callback(args);
		} else {
			callback();
		}
	}
}
