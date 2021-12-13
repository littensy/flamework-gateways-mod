-- Compiled with roblox-ts v1.2.7
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("TS"):WaitForChild("RuntimeLib"))
local Modding = TS.import(script, TS.getModule(script, "@flamework", "core").out).Modding
local _connection = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "node_modules", "flamework-gateways-mod", "connection")
local client = _connection.client
local server = _connection.server
local callObjectProperty = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "node_modules", "flamework-gateways-mod", "utils", "call-object-property").callObjectProperty
local Request = Modding.createDecorator("Method", function(descriptor)
	if server ~= 0 and (server == server and (server ~= "" and server)) then
		server._connection:createFunction(descriptor.property, function(...)
			local args = { ... }
			local promise = callObjectProperty(descriptor.object, descriptor.property, descriptor.object, unpack(args))
			if not TS.Promise.is(promise) then
				return promise
			end
			local status, value = promise:awaitStatus()
			if status == TS.Promise.Status.Resolved then
				return value
			elseif status == TS.Promise.Status.Rejected then
				error(value)
			else
				error("The awaited Promise was cancelled (" .. (descriptor.id .. ")"))
			end
		end)
	elseif client ~= 0 and (client == client and (client ~= "" and client)) then
		error("Client side RemoteFunctions are unsafe! (" .. (descriptor.id .. ")"))
	end
end)
return {
	Request = Request,
}
