import { Gateway, OnEvent } from "@rbxts/flamework-gateways-mod";
import { Players } from "@rbxts/services";

const localPlayer = Players.LocalPlayer as Player & {
	Character: Model & {
		Humanoid: Humanoid;
	};
};

@Gateway()
export class MyGateway {
	@OnEvent()
	async performJump(height: number) {
		print(`Performing jump at height ${height}`);
		const defaultHeight = localPlayer.Character.Humanoid.JumpHeight;
		localPlayer.Character.Humanoid.JumpHeight = height;
		localPlayer.Character.Humanoid.Jump = true;
		localPlayer.Character.Humanoid.JumpHeight = defaultHeight;
	}
}
