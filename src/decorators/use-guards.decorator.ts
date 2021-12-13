import { Modding } from "@flamework/core";

import { extendMetadata } from "../utils/extend-metadata";

export const UseGuards = Modding.createDecorator<object[]>("Method", (descriptor, ...config) => {
	extendMetadata(descriptor.object, `${descriptor.property}/guards`, ...config);
});
