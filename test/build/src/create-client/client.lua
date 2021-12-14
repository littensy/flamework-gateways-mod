-- Compiled with roblox-ts v1.2.7
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("TS"):WaitForChild("RuntimeLib"))
local ClientRemote = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "node_modules", "flamework-gateways-mod", "create-client", "client-remote").ClientRemote
local Client
do
	Client = setmetatable({}, {
		__tostring = function()
			return "Client"
		end,
	})
	Client.__index = Client
	function Client.new(...)
		local self = setmetatable({}, Client)
		return self:constructor(...) or self
	end
	function Client:constructor()
		self._remote = ClientRemote.new()
	end
	function Client:on(eventName, listener)
		return self._remote:getClientEvent().OnClientEvent:Connect(function(key, ...)
			local args = { ... }
			if key == eventName then
				listener(unpack(args))
			end
		end)
	end
	Client.wait = TS.async(function(self, eventName)
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
	function Client:emit(eventName, ...)
		local args = { ... }
		local event = self._remote:getEvent(eventName)
		if not event then
			error("Event '" .. (tostring(eventName) .. "' does not exist on the server."))
		end
		event:FireServer(unpack(args))
	end
	Client.request = TS.async(function(self, requestName, ...)
		local args = { ... }
		local request = self._remote:getRequest(requestName)
		if not request then
			error("Request '" .. (tostring(requestName) .. "' does not exist on the server."))
		end
		return request:InvokeServer(unpack(args))
	end)
end
return {
	Client = Client,
}
