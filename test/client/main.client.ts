import { Flamework } from "@flamework/core";
import { Client, client } from "@rbxts/flamework-gateways-mod";

import { MyGateway } from "./gateways/my.gateway";
import { TestGateway } from "./gateways/test.gateway";

async function bootstrap() {
	Flamework.addPaths("./gateways");
	Flamework.ignite();

	const connection = client as Client<TestGateway, MyGateway>;

	print("\nSending message to gateway");
	connection.onTest("\t-> Hello from the client!");
	task.wait(0.5);

	print("\nRequesting meaning of life");
	const result = await connection.getMeaningOfLife();
	print("\t-> It's " + result);

	print("\nListening to jump height");
	connection.performJump(height => {
		print("\t-> Jump height: " + height);
	});
}

bootstrap().catch(err => warn(err));
