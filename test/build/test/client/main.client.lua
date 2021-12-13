-- Compiled with roblox-ts v1.2.7
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("TS"):WaitForChild("RuntimeLib"))
local Flamework = TS.import(script, TS.getModule(script, "@flamework", "core").out).Flamework
local client = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "node_modules", "flamework-gateways-mod").client
local bootstrap = TS.async(function()
	Flamework._addPaths({ "StarterPlayer", "StarterPlayerScripts", "Client", "gateways" })
	Flamework.ignite()
	local connection = client
	print("\nSending message to gateway")
	connection.onTest("\t-> Hello from the client!")
	task.wait(0.5)
	print("\nRequesting meaning of life")
	local result = TS.await(connection.getMeaningOfLife())
	print("\t-> It's " .. tostring(result))
	print("\nListening to jump height")
	connection.performJump(function(height)
		print("\t-> Jump height: " .. tostring(height))
	end)
end)
bootstrap():catch(function(err)
	return warn(err)
end)
