-- Compiled with roblox-ts v1.2.7
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("TS"):WaitForChild("RuntimeLib"))
local _core = TS.import(script, TS.getModule(script, "@flamework", "core").out)
local Modding = _core.Modding
local Reflect = _core.Reflect
local RunService = TS.import(script, TS.getModule(script, "@rbxts", "services")).RunService
local IS_ON_INVOKE_METADATA = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "node_modules", "flamework-gateways-mod", "constants").IS_ON_INVOKE_METADATA
local getServer = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "node_modules", "flamework-gateways-mod", "create-server").getServer
local RemoteHandler = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "node_modules", "flamework-gateways-mod", "helpers", "remote-handler").RemoteHandler
local OnInvoke = Modding.createDecorator("Method", function(descriptor)
	if RunService:IsClient() then
		error("@Request decorator is not supported on the client.")
	end
	local remote = getServer()._remote
	local method = descriptor.object[descriptor.property]
	local remoteHandler = RemoteHandler.new(descriptor)
	remote:bindRequest(descriptor.property, function(...)
		local initialArgs = { ... }
		local promise = TS.Promise.new(function(resolve, reject)
			remoteHandler:process(function(args)
				if args ~= nil then
					resolve(method(descriptor.object, unpack(args)))
				else
					reject("A guard blocked request '" .. (descriptor.property .. "'; An error will be thrown."))
				end
			end, unpack(initialArgs))
		end)
		return promise:expect()
	end)
	Reflect.defineMetadata(descriptor.object, IS_ON_INVOKE_METADATA .. ("." .. descriptor.property), true)
end)
return {
	OnInvoke = OnInvoke,
}
