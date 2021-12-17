import { Reflect } from "@flamework/core";
import { MethodDescriptor } from "@flamework/core/out/modding";

import { GUARDS_METADATA, PIPES_METADATA } from "../constants";
import { GuardResolver, PipeResolver } from "../interfaces/resolver.type";

export function getGuardsForMethod(descriptor: MethodDescriptor): GuardResolver[] {
	return [
		...(Reflect.getMetadata<GuardResolver[]>(descriptor.object, `${GUARDS_METADATA}.${descriptor.property}`) || []),
		...(Reflect.getMetadata<GuardResolver[]>(descriptor.object, `${GUARDS_METADATA}`) || []),
	];
}

export function getPipesForMethod(descriptor: MethodDescriptor): PipeResolver[][] {
	return Reflect.getMetadata<PipeResolver[][]>(descriptor.object, `${PIPES_METADATA}.${descriptor.property}`) || [];
}
