-- Compiled with roblox-ts v1.2.7
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("TS"):WaitForChild("RuntimeLib"))
local ServerRemote = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "node_modules", "flamework-gateways-mod", "create-server", "server-remote").ServerRemote
local Server
do
	Server = setmetatable({}, {
		__tostring = function()
			return "Server"
		end,
	})
	Server.__index = Server
	function Server.new(...)
		local self = setmetatable({}, Server)
		return self:constructor(...) or self
	end
	function Server:constructor()
		self._remote = ServerRemote.new()
	end
	function Server:on(eventName, listener)
		local event = self._remote:getEvent(eventName)
		if not event then
			error("Event '" .. (tostring(eventName) .. "' does not exist on the server."))
		end
		return event.OnServerEvent:Connect(listener)
	end
	Server.wait = TS.async(function(self, eventName)
		return TS.Promise.new(function(resolve, _reject, onCancel)
			local connection
			connection = self:on(eventName, function(...)
				local args = { ... }
				connection:Disconnect()
				resolve(args)
			end)
			onCancel(function()
				return connection:Disconnect()
			end)
		end)
	end)
	function Server:emit(eventName, players, ...)
		local args = { ... }
		if typeof(players) == "Instance" then
			self._remote:getClientEvent():FireClient(players, eventName, unpack(args))
		else
			for _, player in ipairs(players) do
				self._remote:getClientEvent():FireClient(player, eventName, unpack(args))
			end
		end
	end
	function Server:broadcast(eventName, ...)
		local args = { ... }
		self._remote:getClientEvent():FireAllClients(eventName, unpack(args))
	end
end
return {
	Server = Server,
}
