-- Compiled with roblox-ts v1.2.7
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("TS"):WaitForChild("RuntimeLib"))
local ClientConnection = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "node_modules", "flamework-gateways-mod", "connection", "client-connection").ClientConnection
local createClientMethods
local function createClient()
	local connection = ClientConnection.new()
	local client = {
		_connection = connection,
		on = function(self, eventName, callback)
			return connection.remoteEvent.OnClientEvent:Connect(function(name, ...)
				local args = { ... }
				if name == eventName then
					callback(unpack(args))
				end
			end)
		end,
		send = function(self, eventName, ...)
			local args = { ... }
			connection:fireServer(eventName, unpack(args))
		end,
		request = function(self, eventName, ...)
			local args = { ... }
			return connection:invokeServer(eventName, unpack(args))
		end,
	}
	createClientMethods(client, connection)
	return client
end
function createClientMethods(client, connection)
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
			return function(...)
				local args = { ... }
				client:send(remoteName, unpack(args))
			end
		else
			local _result_1 = remote
			if _result_1 ~= nil then
				_result_1 = _result_1:IsA("RemoteFunction")
			end
			if _result_1 then
				return function(...)
					local args = { ... }
					return client:request(remoteName, unpack(args))
				end
			elseif connection.events[remoteName] ~= nil then
				return function(callback)
					return client:on(remoteName, callback)
				end
			else
				error("Remote " .. (remoteName .. " is not a RemoteEvent or RemoteFunction"))
			end
		end
	end
	setmetatable(client, {
		__index = __index,
	})
end
return {
	createClient = createClient,
}
