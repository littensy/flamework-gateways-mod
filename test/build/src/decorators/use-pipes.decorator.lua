-- Compiled with roblox-ts v1.2.7
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("TS"):WaitForChild("RuntimeLib"))
local _core = TS.import(script, TS.getModule(script, "@flamework", "core").out)
local Modding = _core.Modding
local Reflect = _core.Reflect
local Object = TS.import(script, TS.getModule(script, "@rbxts", "object-utils"))
local PIPES_METADATA = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "node_modules", "flamework-gateways-mod", "constants").PIPES_METADATA
local isArray = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "node_modules", "flamework-gateways-mod", "utils", "array.utils").isArray
local resolveCtor = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "node_modules", "flamework-gateways-mod", "utils", "constructor.utils").resolveCtor
local UsePipes = Modding.createDecorator("Method", function(descriptor, _param)
	local value = _param[1]
	local id = PIPES_METADATA .. ("." .. descriptor.property)
	local _array = {}
	local _length = #_array
	local _array_1 = (Reflect.getMetadata(descriptor.object, id) or {})
	table.move(_array_1, 1, #_array_1, _length + 1, _array)
	local pipeMetadata = _array
	for _, _binding in ipairs(Object.entries(value)) do
		local index = _binding[1]
		local pipes = _binding[2]
		if not pipes then
			continue
		elseif isArray(pipes) then
			local _array_2 = {}
			local _length_1 = #_array_2
			local _array_3 = (pipeMetadata[index + 1] or {})
			local _Length = #_array_3
			table.move(_array_3, 1, _Length, _length_1 + 1, _array_2)
			_length_1 += _Length
			local _arg0 = function(ctor)
				return resolveCtor(ctor)
			end
			-- ▼ ReadonlyArray.map ▼
			local _newValue = table.create(#pipes)
			for _k, _v in ipairs(pipes) do
				_newValue[_k] = _arg0(_v, _k - 1, pipes)
			end
			-- ▲ ReadonlyArray.map ▲
			table.move(_newValue, 1, #_newValue, _length_1 + 1, _array_2)
			pipeMetadata[index - 1 + 1] = _array_2
		else
			local _array_2 = {}
			local _length_1 = #_array_2
			local _array_3 = (pipeMetadata[index + 1] or {})
			local _Length = #_array_3
			table.move(_array_3, 1, _Length, _length_1 + 1, _array_2)
			_length_1 += _Length
			_array_2[_length_1 + 1] = resolveCtor(pipes)
			pipeMetadata[index - 1 + 1] = _array_2
		end
	end
	Reflect.defineMetadata(descriptor.object, id, pipeMetadata)
end)
return {
	UsePipes = UsePipes,
}
