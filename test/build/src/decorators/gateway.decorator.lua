-- Compiled with roblox-ts v1.2.7
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("TS"):WaitForChild("RuntimeLib"))
local _core = TS.import(script, TS.getModule(script, "@flamework", "core").out)
local Modding = _core.Modding
local Reflect = _core.Reflect
local GUARDS_METADATA = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "node_modules", "flamework-gateways-mod", "constants").GUARDS_METADATA
local resolveCtor = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "node_modules", "flamework-gateways-mod", "utils", "constructor.utils").resolveCtor
local Gateway = Modding.createDecorator("Class", function(descriptor, _param)
	local options = _param[1]
	local _fn = Reflect
	local _exp = descriptor.object
	local _exp_1 = GUARDS_METADATA
	local _array = {}
	local _length = #_array
	local _array_1 = (Reflect.getMetadata(descriptor.object, GUARDS_METADATA) or {})
	local _Length = #_array_1
	table.move(_array_1, 1, _Length, _length + 1, _array)
	_length += _Length
	local _result = options
	if _result ~= nil then
		_result = _result.guards
		if _result ~= nil then
			local _arg0 = function(ctor)
				return resolveCtor(ctor)
			end
			-- ▼ ReadonlyArray.map ▼
			local _newValue = table.create(#_result)
			for _k, _v in ipairs(_result) do
				_newValue[_k] = _arg0(_v, _k - 1, _result)
			end
			-- ▲ ReadonlyArray.map ▲
			_result = _newValue
		end
	end
	local _condition = _result
	if not _condition then
		_condition = {}
	end
	table.move(_condition, 1, #_condition, _length + 1, _array)
	_fn.defineMetadata(_exp, _exp_1, _array)
end)
return {
	Gateway = Gateway,
}
