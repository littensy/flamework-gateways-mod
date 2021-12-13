-- Compiled with roblox-ts v1.2.7
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("TS"):WaitForChild("RuntimeLib"))
local exports = {}
for _k, _v in pairs(TS.import(script, game:GetService("ReplicatedStorage"), "TS", "node_modules", "flamework-gateways-mod", "decorators", "event.decorator")) do
	exports[_k] = _v
end
for _k, _v in pairs(TS.import(script, game:GetService("ReplicatedStorage"), "TS", "node_modules", "flamework-gateways-mod", "decorators", "gateway.decorator")) do
	exports[_k] = _v
end
for _k, _v in pairs(TS.import(script, game:GetService("ReplicatedStorage"), "TS", "node_modules", "flamework-gateways-mod", "decorators", "request.decorator")) do
	exports[_k] = _v
end
for _k, _v in pairs(TS.import(script, game:GetService("ReplicatedStorage"), "TS", "node_modules", "flamework-gateways-mod", "decorators", "use-guards.decorator")) do
	exports[_k] = _v
end
return exports
