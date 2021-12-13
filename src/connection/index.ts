import { RunService } from "@rbxts/services";

import { Client } from "../interfaces/client";
import { Server } from "../interfaces/server";
import { createClient } from "./create-client";
import { createServer } from "./create-server";

export let client: Client;
export let server: Server;

if (RunService.IsServer()) {
	server = createServer();
	print("Set up server");
} else {
	client = createClient();
	print("Set up client");
}
