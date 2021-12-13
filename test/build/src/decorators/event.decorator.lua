-- Compiled with roblox-ts v1.2.7
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("TS"):WaitForChild("RuntimeLib"))
local Modding = TS.import(script, TS.getModule(script, "@flamework", "core").out).Modding
local _connection = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "node_modules", "flamework-gateways-mod", "connection")
local client = _connection.client
local server = _connection.server
local callObjectProperty = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "node_modules", "flamework-gateways-mod", "utils", "call-object-property").callObjectProperty
local Event = Modding.createDecorator("Method", function(descriptor)
	if server ~= 0 and (server == server and (server ~= "" and server)) then
		server._connection:createEvent(descriptor.property, function(...)
			local args = { ... }
			callObjectProperty(descriptor.object, descriptor.property, descriptor.object, unpack(args))
		end)
	elseif client ~= 0 and (client == client and (client ~= "" and client)) then
		client._connection:createEvent(descriptor.property, function(...)
			local args = { ... }
			callObjectProperty(descriptor.object, descriptor.property, descriptor.object, unpack(args))
		end)
	end
end)
return {
	Event = Event,
}
