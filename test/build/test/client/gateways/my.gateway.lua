-- Compiled with roblox-ts v1.2.7
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("TS"):WaitForChild("RuntimeLib"))
local Reflect = TS.import(script, TS.getModule(script, "@flamework", "core").out).Reflect
local _flamework_gateways_mod = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "node_modules", "flamework-gateways-mod")
local Gateway = _flamework_gateways_mod.Gateway
local OnEvent = _flamework_gateways_mod.OnEvent
local Players = TS.import(script, TS.getModule(script, "@rbxts", "services")).Players
local localPlayer = Players.LocalPlayer
local MyGateway
do
	MyGateway = setmetatable({}, {
		__tostring = function()
			return "MyGateway"
		end,
	})
	MyGateway.__index = MyGateway
	function MyGateway.new(...)
		local self = setmetatable({}, MyGateway)
		return self:constructor(...) or self
	end
	function MyGateway:constructor()
	end
	MyGateway.performJump = TS.async(function(self, height)
		print("Performing jump at height " .. tostring(height))
		local defaultHeight = localPlayer.Character.Humanoid.JumpHeight
		localPlayer.Character.Humanoid.JumpHeight = height
		localPlayer.Character.Humanoid.Jump = true
		localPlayer.Character.Humanoid.JumpHeight = defaultHeight
	end)
end
Reflect.defineMetadata(MyGateway, "identifier", "@rbxts/flamework-gateways-mod:test/client/gateways/my.gateway@MyGateway")
Reflect.decorate(MyGateway, "@rbxts/flamework-gateways-mod:src/decorators/gateway.decorator@Gateway", Gateway, {})
Reflect.decorate(MyGateway, "@rbxts/flamework-gateways-mod:src/decorators/on-event.decorator@OnEvent", OnEvent, {}, "performJump", false)
return {
	MyGateway = MyGateway,
}
