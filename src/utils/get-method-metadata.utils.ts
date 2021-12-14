import { Reflect } from "@flamework/core";
import { MethodDescriptor } from "@flamework/core/out/modding";

import { GUARDS_METADATA, PIPES_METADATA } from "../constants";
import { CanActivate } from "../interfaces/features/can-activate.interface";
import { PipeTransform } from "../interfaces/features/pipe-transform.interface";

export function getGuardsForMethod(descriptor: MethodDescriptor): CanActivate[] {
	return [
		...(Reflect.getMetadata<CanActivate[]>(descriptor.object, `${GUARDS_METADATA}.${descriptor.property}`) || []),
		...(Reflect.getMetadata<CanActivate[]>(descriptor.object, `${GUARDS_METADATA}`) || []),
	];
}

export function getPipesForMethod(descriptor: MethodDescriptor): PipeTransform[][] {
	return Reflect.getMetadata<PipeTransform[][]>(descriptor.object, `${PIPES_METADATA}.${descriptor.property}`) || [];
}
