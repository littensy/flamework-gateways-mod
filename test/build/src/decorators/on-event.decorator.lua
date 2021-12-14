-- Compiled with roblox-ts v1.2.7
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("TS"):WaitForChild("RuntimeLib"))
local _core = TS.import(script, TS.getModule(script, "@flamework", "core").out)
local Modding = _core.Modding
local Reflect = _core.Reflect
local RunService = TS.import(script, TS.getModule(script, "@rbxts", "services")).RunService
local IS_ON_EVENT_METADATA = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "node_modules", "flamework-gateways-mod", "constants").IS_ON_EVENT_METADATA
local getClient = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "node_modules", "flamework-gateways-mod", "create-client").getClient
local getServer = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "node_modules", "flamework-gateways-mod", "create-server").getServer
local RemoteHandler = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "node_modules", "flamework-gateways-mod", "helpers", "remote-handler").RemoteHandler
local OnEvent = Modding.createDecorator("Method", function(descriptor)
	local remote = RunService:IsClient() and getClient()._remote or getServer()._remote
	local method = descriptor.object[descriptor.property]
	local remoteHandler = RemoteHandler.new(descriptor)
	remote:bindEvent(descriptor.property, function(...)
		local initialArgs = { ... }
		remoteHandler:process(function(args)
			if args ~= nil then
				method(descriptor.object, unpack(args))
			end
		end, unpack(initialArgs)):catch(function(err)
			return warn("Error in event handler: " .. tostring(err))
		end)
	end)
	Reflect.defineMetadata(descriptor.object, IS_ON_EVENT_METADATA .. ("." .. descriptor.property), true)
end)
return {
	OnEvent = OnEvent,
}
