-- Compiled with roblox-ts v1.2.7
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("TS"):WaitForChild("RuntimeLib"))
local _core = TS.import(script, TS.getModule(script, "@flamework", "core").out)
local Modding = _core.Modding
local Reflect = _core.Reflect
local GUARDS_METADATA = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "node_modules", "flamework-gateways-mod", "constants").GUARDS_METADATA
local resolveCtor = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "node_modules", "flamework-gateways-mod", "utils", "constructor.utils").resolveCtor
local UseGuards = Modding.createDecorator("Method", function(descriptor, guards)
	local id = GUARDS_METADATA .. ("." .. descriptor.property)
	local _fn = Reflect
	local _exp = descriptor.object
	local _array = {}
	local _length = #_array
	local _array_1 = (Reflect.getMetadata(descriptor.object, id) or {})
	local _Length = #_array_1
	table.move(_array_1, 1, _Length, _length + 1, _array)
	_length += _Length
	local _arg0 = function(ctor)
		return resolveCtor(ctor)
	end
	-- ▼ ReadonlyArray.map ▼
	local _newValue = table.create(#guards)
	for _k, _v in ipairs(guards) do
		_newValue[_k] = _arg0(_v, _k - 1, guards)
	end
	-- ▲ ReadonlyArray.map ▲
	table.move(_newValue, 1, #_newValue, _length + 1, _array)
	_fn.defineMetadata(_exp, id, _array)
end)
return {
	UseGuards = UseGuards,
}
