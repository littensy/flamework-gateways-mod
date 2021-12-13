-- Compiled with roblox-ts v1.2.7
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("TS"):WaitForChild("RuntimeLib"))
local Players = TS.import(script, TS.getModule(script, "@rbxts", "services")).Players
local ServerConnection = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "node_modules", "flamework-gateways-mod", "connection", "server-connection").ServerConnection
local createServerMethods
local function createServer()
	local connection = ServerConnection.new()
	local server = {
		_connection = connection,
		on = function(self, eventName, callback)
			local remote = connection:getRemote(eventName)
			if not remote then
				error('Event "' .. (eventName .. '" not found'))
			end
			return remote.OnServerEvent:Connect(callback)
		end,
		send = function(self, eventName, players, ...)
			local args = { ... }
			if typeof(players) == "Instance" then
				connection:fireClient(eventName, players, unpack(args))
			else
				for _, player in ipairs(players) do
					connection:fireClient(eventName, player, unpack(args))
				end
			end
		end,
		filteredSend = function(self, eventName, predicate, ...)
			local args = { ... }
			local _exp = Players:GetPlayers()
			-- ▼ ReadonlyArray.filter ▼
			local _newValue = {}
			local _length = 0
			for _k, _v in ipairs(_exp) do
				if predicate(_v, _k - 1, _exp) == true then
					_length += 1
					_newValue[_length] = _v
				end
			end
			-- ▲ ReadonlyArray.filter ▲
			for _, player in ipairs(_newValue) do
				connection:fireClient(eventName, player, unpack(args))
			end
		end,
		broadcast = function(self, eventName, ...)
			local args = { ... }
			connection:fireAllClients(eventName, unpack(args))
		end,
	}
	createServerMethods(server, connection)
	return server
end
function createServerMethods(server, connection)
	local __index = function(_self, remoteName)
		if not (type(remoteName) == "string") then
			return nil
		end
		local remote = connection:getRemote(remoteName)
		local _result = remote
		if _result ~= nil then
			_result = _result:IsA("RemoteEvent")
		end
		if _result then
			return function(callback)
				return server:on(remoteName, callback)
			end
		else
			return function(players, ...)
				local args = { ... }
				server:send(remoteName, players, unpack(args))
			end
		end
	end
	setmetatable(server, {
		__index = __index,
	})
end
return {
	createServer = createServer,
}
