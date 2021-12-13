-- Compiled with roblox-ts v1.2.7
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("TS"):WaitForChild("RuntimeLib"))
local ReplicatedStorage = TS.import(script, TS.getModule(script, "@rbxts", "services")).ReplicatedStorage
local _constants = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "node_modules", "flamework-gateways-mod", "constants")
local CLIENT_REMOTE_NAME = _constants.CLIENT_REMOTE_NAME
local GATEWAY_CONTAINER_NAME = _constants.GATEWAY_CONTAINER_NAME
local ClientConnection
do
	ClientConnection = setmetatable({}, {
		__tostring = function()
			return "ClientConnection"
		end,
	})
	ClientConnection.__index = ClientConnection
	function ClientConnection.new(...)
		local self = setmetatable({}, ClientConnection)
		return self:constructor(...) or self
	end
	function ClientConnection:constructor()
		self.container = ReplicatedStorage:WaitForChild(GATEWAY_CONTAINER_NAME)
		self.remoteEvent = self.container:WaitForChild(CLIENT_REMOTE_NAME)
		self.events = {}
		self.remoteEvent.OnClientEvent:Connect(function(name, ...)
			local args = { ... }
			local callback = self.events[name]
			if callback then
				callback(unpack(args))
			else
				error("Attempted to call remote " .. (name .. " but it doesn't exist"))
			end
		end)
	end
	function ClientConnection:getRemote(name)
		return self.container:FindFirstChild(name)
	end
	function ClientConnection:fireServer(name, ...)
		local args = { ... }
		local event = self.container:FindFirstChild(name)
		if not event or not event:IsA("RemoteEvent") then
			error("Attempted to fire event " .. (name .. " but it doesn't exist"))
		end
		event:FireServer(unpack(args))
	end
	ClientConnection.invokeServer = TS.async(function(self, name, ...)
		local args = { ... }
		local request = self.container:FindFirstChild(name)
		if not request or not request:IsA("RemoteFunction") then
			error("Attempted to invoke function " .. (name .. " but it doesn't exist"))
		end
		return request:InvokeServer(unpack(args))
	end)
	function ClientConnection:createEvent(name, callback)
		if self.events[name] ~= nil then
			error("Remote " .. (name .. " already exists"))
		end
		-- ▼ Map.set ▼
		self.events[name] = callback
		-- ▲ Map.set ▲
	end
end
return {
	ClientConnection = ClientConnection,
}
