-- Compiled with roblox-ts v1.2.7
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("TS"):WaitForChild("RuntimeLib"))
local Client = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "node_modules", "flamework-gateways-mod", "create-client", "client").Client
local initClientMetatable = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "node_modules", "flamework-gateways-mod", "create-client", "client-metatable").initClientMetatable
local connection
local function getClient()
	if not (connection ~= 0 and (connection == connection and (connection ~= "" and connection))) then
		error("Client connection is not initialized; Try calling 'createClient' before igniting Flamework")
	end
	return connection
end
local createClient = TS.async(function()
	if connection ~= 0 and (connection == connection and (connection ~= "" and connection)) then
		return connection
	end
	local client = Client.new()
	initClientMetatable(client)
	connection = client
	return connection
end)
return {
	getClient = getClient,
	createClient = createClient,
}
