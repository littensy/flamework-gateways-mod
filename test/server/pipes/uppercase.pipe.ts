import { ExecutionContext, PipeTransform } from "@rbxts/flamework-gateways-mod";

export class UppercasePipe implements PipeTransform {
	transform(value: unknown, _context: ExecutionContext) {
		assert(typeIs(value, "string"), "(UppercasePipe) Value must be a string");
		print(`(UppercasePipe) Changing ${value} to ${value.upper()}`);
		return value.upper();
	}
}
