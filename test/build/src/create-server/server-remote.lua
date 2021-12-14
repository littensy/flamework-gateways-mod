-- Compiled with roblox-ts v1.2.7
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("TS"):WaitForChild("RuntimeLib"))
local Make = TS.import(script, TS.getModule(script, "@rbxts", "make"))
local ReplicatedStorage = TS.import(script, TS.getModule(script, "@rbxts", "services")).ReplicatedStorage
local _constants = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "node_modules", "flamework-gateways-mod", "constants")
local EVENTS_FOLDER = _constants.EVENTS_FOLDER
local REQUESTS_FOLDER = _constants.REQUESTS_FOLDER
local RESERVED_CLIENT_EVENT = _constants.RESERVED_CLIENT_EVENT
local ServerRemote
do
	ServerRemote = setmetatable({}, {
		__tostring = function()
			return "ServerRemote"
		end,
	})
	ServerRemote.__index = ServerRemote
	function ServerRemote.new(...)
		local self = setmetatable({}, ServerRemote)
		return self:constructor(...) or self
	end
	function ServerRemote:constructor()
		self.eventsFolder = Make("Folder", {
			Name = EVENTS_FOLDER,
			Parent = ReplicatedStorage,
			Children = { Make("RemoteEvent", {
				Name = RESERVED_CLIENT_EVENT,
			}) },
		})
		self.requestsFolder = Make("Folder", {
			Name = REQUESTS_FOLDER,
			Parent = ReplicatedStorage,
		})
	end
	function ServerRemote:getEvents()
		return self.eventsFolder:GetChildren()
	end
	function ServerRemote:getRequests()
		return self.requestsFolder:GetChildren()
	end
	function ServerRemote:getEvent(name)
		return self.eventsFolder:FindFirstChild(name)
	end
	function ServerRemote:getRequest(name)
		return self.requestsFolder:FindFirstChild(name)
	end
	function ServerRemote:getClientEvent()
		return self.eventsFolder:FindFirstChild(RESERVED_CLIENT_EVENT)
	end
	function ServerRemote:bindEvent(name, callback)
		if self.eventsFolder:FindFirstChild(name) then
			error("Event '" .. (name .. "' cannot have duplicate implementations"))
		end
		local _condition = (self.eventsFolder:FindFirstChild(name))
		if _condition == nil then
			_condition = Make("RemoteEvent", {
				Name = name,
				Parent = self.eventsFolder,
			})
		end
		local event = _condition
		return event.OnServerEvent:Connect(callback)
	end
	function ServerRemote:bindRequest(name, callback)
		if self.requestsFolder:FindFirstChild(name) then
			error("Request '" .. (name .. "' cannot have duplicate implementations"))
		end
		local _condition = (self.requestsFolder:FindFirstChild(name))
		if _condition == nil then
			_condition = Make("RemoteFunction", {
				Name = name,
				Parent = self.requestsFolder,
			})
		end
		local request = _condition
		request.OnServerInvoke = callback
	end
end
return {
	ServerRemote = ServerRemote,
}
