-- Compiled with roblox-ts v1.2.7
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("TS"):WaitForChild("RuntimeLib"))
local Modding = TS.import(script, TS.getModule(script, "@flamework", "core").out).Modding
local extendMetadata = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "node_modules", "flamework-gateways-mod", "utils", "extend-metadata").extendMetadata
local UseGuards = Modding.createDecorator("Method", function(descriptor, ...)
	local config = { ... }
	extendMetadata(descriptor.object, descriptor.property .. "/guards", unpack(config))
end)
return {
	UseGuards = UseGuards,
}
