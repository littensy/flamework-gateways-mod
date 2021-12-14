-- Compiled with roblox-ts v1.2.7
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("TS"):WaitForChild("RuntimeLib"))
local Object = TS.import(script, TS.getModule(script, "@rbxts", "object-utils"))
local getPipesForMethod = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "node_modules", "flamework-gateways-mod", "utils", "get-method-metadata.utils").getPipesForMethod
local PipesConsumer
do
	PipesConsumer = setmetatable({}, {
		__tostring = function()
			return "PipesConsumer"
		end,
	})
	PipesConsumer.__index = PipesConsumer
	function PipesConsumer.new(...)
		local self = setmetatable({}, PipesConsumer)
		return self:constructor(...) or self
	end
	function PipesConsumer:constructor()
	end
	PipesConsumer.applyPipes = TS.async(function(self, context)
		local transforms = getPipesForMethod(context:getDescriptor())
		local args = context:getArgs()
		for _, _binding in ipairs(Object.entries(args)) do
			local index = _binding[1]
			local value = _binding[2]
			local transform = transforms[index - 1 + 1]
			if not transform then
				continue
			end
			local _arg0 = TS.async(function(deferredValue, pipe)
				local val = TS.await(deferredValue)
				local result = pipe:transform(val, context)
				return result
			end)
			local _arg1 = TS.Promise.resolve(value)
			-- ▼ ReadonlyArray.reduce ▼
			local _result = _arg1
			local _callback = _arg0
			for _i = 1, #transform do
				_result = _callback(_result, transform[_i], _i - 1, transform)
			end
			-- ▲ ReadonlyArray.reduce ▲
			args[index - 1 + 1] = TS.await(_result)
		end
		return args
	end)
end
return {
	PipesConsumer = PipesConsumer,
}
