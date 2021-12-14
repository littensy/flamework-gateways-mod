-- Compiled with roblox-ts v1.2.7
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("TS"):WaitForChild("RuntimeLib"))
local Server = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "node_modules", "flamework-gateways-mod", "create-server", "server").Server
local initServerMetatable = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "node_modules", "flamework-gateways-mod", "create-server", "server-metatable").initServerMetatable
local connection
local function getServer()
	if not (connection ~= 0 and (connection == connection and (connection ~= "" and connection))) then
		error("Client connection is not initialized; Try calling 'createServer' before igniting Flamework")
	end
	return connection
end
local function createServer()
	if connection ~= 0 and (connection == connection and (connection ~= "" and connection)) then
		return connection
	end
	local server = Server.new()
	initServerMetatable(server)
	connection = server
	return connection
end
return {
	getServer = getServer,
	createServer = createServer,
}
