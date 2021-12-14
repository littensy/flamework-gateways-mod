-- Compiled with roblox-ts v1.2.7
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("TS"):WaitForChild("RuntimeLib"))
local t = TS.import(script, TS.getModule(script, "@rbxts", "t").lib.ts).t
local isArray = t.array(t.any)
local isEmpty = function(arr)
	return isArray(arr) and #arr == 0
end
return {
	isArray = isArray,
	isEmpty = isEmpty,
}
