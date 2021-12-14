-- Compiled with roblox-ts v1.2.7
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("TS"):WaitForChild("RuntimeLib"))
local createClient = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "node_modules", "flamework-gateways-mod", "create-client").createClient
local createServer = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "node_modules", "flamework-gateways-mod", "create-server").createServer
local function connectClient()
	return createClient()
end
local function connectServer()
	return createServer()
end
return {
	connectClient = connectClient,
	connectServer = connectServer,
}
