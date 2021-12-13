import { Modding } from "@flamework/core";

export const Gateway = Modding.createDecorator("Class", (descriptor, config) => {
	print("Gateway decorator called");
});
