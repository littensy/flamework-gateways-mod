import { CanActivate, ExecutionContext } from "@rbxts/flamework-gateways-mod";

export class AdminGuard implements CanActivate {
	constructor(private readonly admins: Array<string>) {}

	canActivate(context: ExecutionContext) {
		const isAdmin = this.admins.includes(context.getPlayer().Name);
		print(`(AdminGuard) ${context.getPlayer().Name} is ${isAdmin ? "" : "not "}an admin`);
		return isAdmin;
	}
}
