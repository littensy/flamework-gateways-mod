-- Compiled with roblox-ts v1.2.7
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("TS"):WaitForChild("RuntimeLib"))
local RunService = TS.import(script, TS.getModule(script, "@rbxts", "services")).RunService
local ExecutionContextHost = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "node_modules", "flamework-gateways-mod", "helpers", "execution-context-host").ExecutionContextHost
local GuardsConsumer = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "node_modules", "flamework-gateways-mod", "helpers", "guards-consumer").GuardsConsumer
local PipesConsumer = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "node_modules", "flamework-gateways-mod", "helpers", "pipes-consumer").PipesConsumer
local RemoteHandler
do
	RemoteHandler = setmetatable({}, {
		__tostring = function()
			return "RemoteHandler"
		end,
	})
	RemoteHandler.__index = RemoteHandler
	function RemoteHandler.new(...)
		local self = setmetatable({}, RemoteHandler)
		return self:constructor(...) or self
	end
	function RemoteHandler:constructor(descriptor)
		self.descriptor = descriptor
		self.guardsConsumer = GuardsConsumer.new()
		self.pipesConsumer = PipesConsumer.new()
	end
	RemoteHandler.process = TS.async(function(self, callback, ...)
		local initialArgs = { ... }
		local player = RunService:IsServer() and (initialArgs[1]) or nil
		local context = ExecutionContextHost.new(initialArgs, self.descriptor, player)
		local args = TS.await(self.pipesConsumer:applyPipes(context))
		local canActivate = TS.await(self.guardsConsumer:tryActivate(context))
		if canActivate then
			callback(args)
		else
			callback()
		end
	end)
end
return {
	RemoteHandler = RemoteHandler,
}
