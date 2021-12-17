import { Flamework } from "@flamework/core";
import { connectClient } from "@rbxts/flamework-gateways-mod";

import { MyGateway } from "./gateways/my.gateway";
import { TestGateway } from "./gateways/test.gateway";

async function bootstrap() {
	const client = connectClient<TestGateway, MyGateway>();

	Flamework.addPaths("./gateways");
	Flamework.ignite();

	print("\nRequesting meaning of life");
	const result = await client.request("getMeaningOfLife", "test");
	print("-> It's " + result);

	print("\nListening to jump height");
	client.on("performJump", height => {
		print("-> (on) Jump height: " + height);
	});
	client.wait("performJump").then(([height]) => {
		print("-> (wait) Jump height: " + height);
	});

	task.wait(0.5);
	print("\nSending message to gateway");
	client.emit("onTest", "-> Hello from the client!");
}

bootstrap().catch(err => warn(err));
