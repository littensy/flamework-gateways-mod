import { Flamework } from "@flamework/core";
import { Server, server } from "@rbxts/flamework-gateways-mod";
import { Players } from "@rbxts/services";

import { MyGateway } from "./gateways/my.gateway";
import { TestGateway } from "./gateways/test.gateway";

async function bootstrap() {
	Flamework.addPaths("./gateways");
	Flamework.ignite();

	const connection = server as Server<TestGateway, MyGateway>;

	print("\nAdding extra listener to onTest");
	connection.onTest(value => print(`Extra listener: ${value}`));
	task.wait(2);

	print("\nRequesting a jump");
	connection.performJump(Players.GetPlayers(), 200);
}

bootstrap().catch(err => warn(err));
