import { Flamework } from "@flamework/core";
import { connectServer } from "@rbxts/flamework-gateways-mod";
import { Players } from "@rbxts/services";

import { MyGateway } from "./gateways/my.gateway";
import { TestGateway } from "./gateways/test.gateway";

async function bootstrap() {
	const server = connectServer<TestGateway, MyGateway>();

	Flamework.addPaths("./gateways");
	Flamework.ignite();
	task.wait(2);

	print("Requesting a jump");
	server.performJump(Players.GetPlayers(), 200);
}

bootstrap().catch(err => warn(err));
