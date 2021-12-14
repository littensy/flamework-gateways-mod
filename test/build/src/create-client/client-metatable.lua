-- Compiled with roblox-ts v1.2.7
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("TS"):WaitForChild("RuntimeLib"))
local Client = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "node_modules", "flamework-gateways-mod", "create-client", "client").Client
local createEmitter = function(client, name)
	return function(...)
		local args = { ... }
		client:emit(name, unpack(args))
	end
end
local createInvoker = function(client, name)
	return function(...)
		local args = { ... }
		return client:request(name, unpack(args))
	end
end
local createListener = function(client, name)
	return function(listener)
		return client:on(name, listener)
	end
end
local function initClientMetatable(client)
	local __index = function(_, key)
		if not (type(key) == "string") then
			return nil
		end
		local eventOrRequest = client._remote:getEvent(key) or client._remote:getRequest(key)
		if eventOrRequest == nil then
			return createListener(client, key)
		elseif eventOrRequest:IsA("RemoteFunction") then
			return createInvoker(client, key)
		elseif eventOrRequest:IsA("RemoteEvent") then
			return createEmitter(client, key)
		end
	end
	setmetatable(Client, {
		__index = __index,
	})
end
return {
	initClientMetatable = initClientMetatable,
}
