-- Compiled with roblox-ts v1.2.7
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("TS"):WaitForChild("RuntimeLib"))
local Reflect = TS.import(script, TS.getModule(script, "@flamework", "core").out).Reflect
local _flamework_gateways_mod = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "node_modules", "flamework-gateways-mod")
local Event = _flamework_gateways_mod.Event
local Gateway = _flamework_gateways_mod.Gateway
local Request = _flamework_gateways_mod.Request
local TestGateway
do
	TestGateway = setmetatable({}, {
		__tostring = function()
			return "TestGateway"
		end,
	})
	TestGateway.__index = TestGateway
	function TestGateway.new(...)
		local self = setmetatable({}, TestGateway)
		return self:constructor(...) or self
	end
	function TestGateway:constructor()
	end
	TestGateway.onTest = TS.async(function(self, player, value)
		print(player.Name .. (" said " .. value))
	end)
	TestGateway.getMeaningOfLife = TS.async(function(self, player)
		print(player.Name .. " asked for the meaning of life")
		return 42
	end)
end
Reflect.defineMetadata(TestGateway, "identifier", "@rbxts/flamework-gateways-mod:test/server/gateways/test.gateway@TestGateway")
Reflect.decorate(TestGateway, "@rbxts/flamework-gateways-mod:src/decorators/gateway.decorator@Gateway", Gateway, {})
Reflect.decorate(TestGateway, "@rbxts/flamework-gateways-mod:src/decorators/event.decorator@Event", Event, {}, "onTest", false)
Reflect.decorate(TestGateway, "@rbxts/flamework-gateways-mod:src/decorators/request.decorator@Request", Request, {}, "getMeaningOfLife", false)
return {
	TestGateway = TestGateway,
}
