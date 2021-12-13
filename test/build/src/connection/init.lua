-- Compiled with roblox-ts v1.2.7
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("TS"):WaitForChild("RuntimeLib"))
local exports = {}
local RunService = TS.import(script, TS.getModule(script, "@rbxts", "services")).RunService
local createClient = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "node_modules", "flamework-gateways-mod", "connection", "create-client").createClient
local createServer = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "node_modules", "flamework-gateways-mod", "connection", "create-server").createServer
if RunService:IsServer() then
	exports.server = createServer()
	print("Set up server")
else
	exports.client = createClient()
	print("Set up client")
end
return exports
