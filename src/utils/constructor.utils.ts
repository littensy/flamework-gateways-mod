import { Constructor } from "../interfaces/constructor.interface";

export function isCtor<Ctor extends Constructor = Constructor>(object: unknown): object is Ctor {
	if (!typeIs(object, "table")) {
		return false;
	}
	return typeIs(rawget(object, "new"), "function");
}

export function resolveCtor<T>(ctor: T | Constructor<T>): T {
	if (isCtor(ctor)) {
		return new ctor();
	} else {
		return ctor;
	}
}
