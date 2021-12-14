-- Compiled with roblox-ts v1.2.7
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("TS"):WaitForChild("RuntimeLib"))
local exports = {}
exports.Gateway = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "node_modules", "flamework-gateways-mod", "decorators", "gateway.decorator").Gateway
exports.OnEvent = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "node_modules", "flamework-gateways-mod", "decorators", "on-event.decorator").OnEvent
exports.OnInvoke = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "node_modules", "flamework-gateways-mod", "decorators", "on-invoke.decorator").OnInvoke
exports.UseGuards = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "node_modules", "flamework-gateways-mod", "decorators", "use-guards.decorator").UseGuards
exports.UsePipes = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "node_modules", "flamework-gateways-mod", "decorators", "use-pipes.decorator").UsePipes
return exports
