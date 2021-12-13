import { Event, Gateway, Request, ServerGateway } from "@rbxts/flamework-gateways-mod";

export interface TestGateway extends ServerGateway {}

@Gateway()
export class TestGateway {
	@Event()
	async onTest(player: Player, value: string) {
		print(`${player.Name} said ${value}`);
	}

	@Request()
	async getMeaningOfLife(player: Player) {
		print(`${player.Name} asked for the meaning of life`);
		return 42;
	}
}
