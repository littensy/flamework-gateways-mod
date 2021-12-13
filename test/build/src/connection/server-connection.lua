-- Compiled with roblox-ts v1.2.7
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("TS"):WaitForChild("RuntimeLib"))
local Make = TS.import(script, TS.getModule(script, "@rbxts", "make"))
local ReplicatedStorage = TS.import(script, TS.getModule(script, "@rbxts", "services")).ReplicatedStorage
local _constants = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "node_modules", "flamework-gateways-mod", "constants")
local CLIENT_REMOTE_NAME = _constants.CLIENT_REMOTE_NAME
local GATEWAY_CONTAINER_NAME = _constants.GATEWAY_CONTAINER_NAME
local ServerConnection
do
	ServerConnection = setmetatable({}, {
		__tostring = function()
			return "ServerConnection"
		end,
	})
	ServerConnection.__index = ServerConnection
	function ServerConnection.new(...)
		local self = setmetatable({}, ServerConnection)
		return self:constructor(...) or self
	end
	function ServerConnection:constructor()
		self.container = Make("Folder", {
			Name = GATEWAY_CONTAINER_NAME,
			Parent = ReplicatedStorage,
		})
		self.clientRemote = Make("RemoteEvent", {
			Name = CLIENT_REMOTE_NAME,
			Parent = self.container,
		})
	end
	function ServerConnection:fireClient(name, player, ...)
		local args = { ... }
		self.clientRemote:FireClient(player, name, unpack(args))
	end
	function ServerConnection:fireAllClients(name, ...)
		local args = { ... }
		self.clientRemote:FireAllClients(name, unpack(args))
	end
	function ServerConnection:getRemote(name)
		return self.container:FindFirstChild(name)
	end
	function ServerConnection:createEvent(name, callback)
		if self:getRemote(name) then
			error("Remote " .. (name .. " already exists"))
		end
		local event = Make("RemoteEvent", {
			Name = name,
			Parent = self.container,
		})
		event.OnServerEvent:Connect(callback)
	end
	function ServerConnection:createFunction(name, callback)
		if self:getRemote(name) then
			error("Remote " .. (name .. " already exists"))
		end
		local event = Make("RemoteFunction", {
			Name = name,
			Parent = self.container,
		})
		event.OnServerInvoke = callback
	end
end
return {
	ServerConnection = ServerConnection,
}
