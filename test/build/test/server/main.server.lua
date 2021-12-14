-- Compiled with roblox-ts v1.2.7
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("TS"):WaitForChild("RuntimeLib"))
local Flamework = TS.import(script, TS.getModule(script, "@flamework", "core").out).Flamework
local connectServer = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "node_modules", "flamework-gateways-mod").connectServer
local Players = TS.import(script, TS.getModule(script, "@rbxts", "services")).Players
local bootstrap = TS.async(function()
	local server = connectServer()
	Flamework._addPaths({ "ServerScriptService", "Server", "gateways" })
	Flamework.ignite()
	task.wait(2)
	print("Requesting a jump")
	server.performJump(Players:GetPlayers(), 200)
end)
bootstrap():catch(function(err)
	return warn(err)
end)
