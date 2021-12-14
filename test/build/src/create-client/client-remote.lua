-- Compiled with roblox-ts v1.2.7
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("TS"):WaitForChild("RuntimeLib"))
local ReplicatedStorage = TS.import(script, TS.getModule(script, "@rbxts", "services")).ReplicatedStorage
local _constants = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "node_modules", "flamework-gateways-mod", "constants")
local EVENTS_FOLDER = _constants.EVENTS_FOLDER
local REQUESTS_FOLDER = _constants.REQUESTS_FOLDER
local RESERVED_CLIENT_EVENT = _constants.RESERVED_CLIENT_EVENT
local ClientRemote
do
	ClientRemote = setmetatable({}, {
		__tostring = function()
			return "ClientRemote"
		end,
	})
	ClientRemote.__index = ClientRemote
	function ClientRemote.new(...)
		local self = setmetatable({}, ClientRemote)
		return self:constructor(...) or self
	end
	function ClientRemote:constructor()
		self.eventsFolder = ReplicatedStorage:WaitForChild(EVENTS_FOLDER)
		self.requestsFolder = ReplicatedStorage:WaitForChild(REQUESTS_FOLDER)
		self.eventHandlerMap = {}
		self:getClientEvent().OnClientEvent:Connect(function(eventName, ...)
			local args = { ... }
			local handler = self.eventHandlerMap[eventName]
			if handler then
				handler(unpack(args))
			else
				error("Server attempted to emit event '" .. (eventName .. "' but no handler was found"))
			end
		end)
	end
	function ClientRemote:getEvents()
		return self.eventsFolder:GetChildren()
	end
	function ClientRemote:getRequests()
		return self.requestsFolder:GetChildren()
	end
	function ClientRemote:getEvent(name)
		return self.eventsFolder:FindFirstChild(name)
	end
	function ClientRemote:getRequest(name)
		return self.requestsFolder:FindFirstChild(name)
	end
	function ClientRemote:getClientEvent()
		return self.eventsFolder:FindFirstChild(RESERVED_CLIENT_EVENT)
	end
	function ClientRemote:bindEvent(name, callback)
		if self.eventHandlerMap[name] ~= nil then
			error("Event '" .. (name .. "' cannot have duplicate implementations"))
		end
		-- ▼ Map.set ▼
		self.eventHandlerMap[name] = callback
		-- ▲ Map.set ▲
	end
	function ClientRemote:bindRequest()
		error("Client-side requests are not supported")
	end
end
return {
	ClientRemote = ClientRemote,
}
