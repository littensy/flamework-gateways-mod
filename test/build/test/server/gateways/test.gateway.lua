-- Compiled with roblox-ts v1.2.7
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("TS"):WaitForChild("RuntimeLib"))
local Reflect = TS.import(script, TS.getModule(script, "@flamework", "core").out).Reflect
local _flamework_gateways_mod = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "node_modules", "flamework-gateways-mod")
local Gateway = _flamework_gateways_mod.Gateway
local OnEvent = _flamework_gateways_mod.OnEvent
local OnInvoke = _flamework_gateways_mod.OnInvoke
local UsePipes = _flamework_gateways_mod.UsePipes
local AdminGuard = TS.import(script, game:GetService("ServerScriptService"), "Server", "guards", "admin.guard").AdminGuard
local UppercasePipe = TS.import(script, game:GetService("ServerScriptService"), "Server", "pipes", "uppercase.pipe").UppercasePipe
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
	TestGateway.getMeaningOfLife = TS.async(function(self, player, _test)
		print(player.Name .. " asked for the meaning of life")
		return 42
	end)
end
Reflect.defineMetadata(TestGateway, "identifier", "@rbxts/flamework-gateways-mod:test/server/gateways/test.gateway@TestGateway")
Reflect.decorate(TestGateway, "@rbxts/flamework-gateways-mod:src/decorators/gateway.decorator@Gateway", Gateway, { {
	guards = { AdminGuard.new({ "littensy" }) },
} })
Reflect.decorate(TestGateway, "@rbxts/flamework-gateways-mod:src/decorators/on-event.decorator@OnEvent", OnEvent, {}, "onTest", false)
Reflect.decorate(TestGateway, "@rbxts/flamework-gateways-mod:src/decorators/use-pipes.decorator@UsePipes", UsePipes, { { nil, UppercasePipe } }, "onTest", false)
Reflect.decorate(TestGateway, "@rbxts/flamework-gateways-mod:src/decorators/on-invoke.decorator@OnInvoke", OnInvoke, {}, "getMeaningOfLife", false)
return {
	TestGateway = TestGateway,
}
