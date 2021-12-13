export function callObjectProperty(object: object, property: string, ...args: unknown[]): unknown {
	if (!(property in object)) {
		throw `Property "${property}" does not exist on object "${object}"`;
	}
	const value: unknown = object[property as never];

	if (!typeIs(value, "function")) {
		throw `Property "${property}" on object "${object}" is not a function`;
	}
	return value(...args);
}
