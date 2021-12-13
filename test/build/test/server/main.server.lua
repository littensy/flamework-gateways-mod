-- Compiled with roblox-ts v1.2.7
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("TS"):WaitForChild("RuntimeLib"))
local Flamework = TS.import(script, TS.getModule(script, "@flamework", "core").out).Flamework
local server = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "node_modules", "flamework-gateways-mod").server
local Players = TS.import(script, TS.getModule(script, "@rbxts", "services")).Players
local bootstrap = TS.async(function()
	Flamework._addPaths({ "ServerScriptService", "Server", "gateways" })
	Flamework.ignite()
	local connection = server
	print("\nAdding extra listener to onTest")
	connection.onTest(function(value)
		return print("Extra listener: " .. tostring(value))
	end)
	task.wait(2)
	print("\nRequesting a jump")
	connection.performJump(Players:GetPlayers(), 200)
end)
bootstrap():catch(function(err)
	return warn(err)
end)
