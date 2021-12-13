-- Compiled with roblox-ts v1.2.7
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("TS"):WaitForChild("RuntimeLib"))
local Modding = TS.import(script, TS.getModule(script, "@flamework", "core").out).Modding
local Gateway = Modding.createDecorator("Class", function(descriptor, config)
	print("Gateway decorator called")
end)
return {
	Gateway = Gateway,
}
