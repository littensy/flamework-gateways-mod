import { Gateway, OnEvent, OnInvoke, UsePipes } from "@rbxts/flamework-gateways-mod";
import { AdminGuard } from "server/guards/admin.guard";
import { UppercasePipe } from "server/pipes/uppercase.pipe";

@Gateway({
	guards: [new AdminGuard(["littensy"])],
})
export class TestGateway {
	@OnEvent()
	@UsePipes([], UppercasePipe)
	async onTest(player: Player, value: string) {
		print(`${player.Name} said ${value}`);
	}

	@OnInvoke()
	async getMeaningOfLife(player: Player, _test: string) {
		print(`${player.Name} asked for the meaning of life`);
		return 42;
	}
}
