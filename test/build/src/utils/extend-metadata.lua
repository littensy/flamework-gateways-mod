-- Compiled with roblox-ts v1.2.7
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("TS"):WaitForChild("RuntimeLib"))
local Reflect = TS.import(script, TS.getModule(script, "@flamework", "core").out).Reflect
local function extendMetadata(obj, key, value)
	local previousValue = Reflect.getMetadata(obj, key) or {}
	local _fn = Reflect
	local _array = {}
	local _length = #_array
	local _previousValueLength = #previousValue
	table.move(previousValue, 1, _previousValueLength, _length + 1, _array)
	_length += _previousValueLength
	table.move(value, 1, #value, _length + 1, _array)
	_fn.defineMetadata(obj, key, _array)
end
return {
	extendMetadata = extendMetadata,
}
