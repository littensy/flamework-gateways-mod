-- Compiled with roblox-ts v1.2.7
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("TS"):WaitForChild("RuntimeLib"))
local Reflect = TS.import(script, TS.getModule(script, "@flamework", "core").out).Reflect
local _constants = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "node_modules", "flamework-gateways-mod", "constants")
local GUARDS_METADATA = _constants.GUARDS_METADATA
local PIPES_METADATA = _constants.PIPES_METADATA
local function getGuardsForMethod(descriptor)
	local _array = {}
	local _length = #_array
	local _array_1 = (Reflect.getMetadata(descriptor.object, GUARDS_METADATA .. ("." .. descriptor.property)) or {})
	local _Length = #_array_1
	table.move(_array_1, 1, _Length, _length + 1, _array)
	_length += _Length
	local _array_2 = (Reflect.getMetadata(descriptor.object, GUARDS_METADATA) or {})
	table.move(_array_2, 1, #_array_2, _length + 1, _array)
	return _array
end
local function getPipesForMethod(descriptor)
	return Reflect.getMetadata(descriptor.object, PIPES_METADATA .. ("." .. descriptor.property)) or {}
end
return {
	getGuardsForMethod = getGuardsForMethod,
	getPipesForMethod = getPipesForMethod,
}
