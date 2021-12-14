-- Compiled with roblox-ts v1.2.7
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("TS"):WaitForChild("RuntimeLib"))
local Server = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "node_modules", "flamework-gateways-mod", "create-server", "server").Server
local createEmitter = function(server, name)
	return function(players, ...)
		local args = { ... }
		server:emit(name, players, unpack(args))
	end
end
local createListener = function(server, name)
	return function(listener)
		return server:on(name, listener)
	end
end
local function initServerMetatable(server)
	local __index = function(_, key)
		if not (type(key) == "string") then
			return nil
		end
		local eventOrRequest = server._remote:getEvent(key) or server._remote:getRequest(key)
		if eventOrRequest == nil then
			return createEmitter(server, key)
		elseif eventOrRequest:IsA("RemoteEvent") then
			return createListener(server, key)
		end
	end
	setmetatable(Server, {
		__index = __index,
	})
end
return {
	initServerMetatable = initServerMetatable,
}
