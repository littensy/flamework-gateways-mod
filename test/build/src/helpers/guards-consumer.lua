-- Compiled with roblox-ts v1.2.7
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("TS"):WaitForChild("RuntimeLib"))
local isEmpty = TS.import(script, TS.getModule(script, "@rbxts", "object-utils")).isEmpty
local getGuardsForMethod = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "node_modules", "flamework-gateways-mod", "utils", "get-method-metadata.utils").getGuardsForMethod
local GuardsConsumer
do
	GuardsConsumer = setmetatable({}, {
		__tostring = function()
			return "GuardsConsumer"
		end,
	})
	GuardsConsumer.__index = GuardsConsumer
	function GuardsConsumer.new(...)
		local self = setmetatable({}, GuardsConsumer)
		return self:constructor(...) or self
	end
	function GuardsConsumer:constructor()
	end
	GuardsConsumer.tryActivate = TS.async(function(self, context)
		local guards = getGuardsForMethod(context:getDescriptor())
		if isEmpty(guards) then
			return true
		end
		for _, guard in ipairs(guards) do
			local result = guard:canActivate(context)
			if TS.await(result) then
				continue
			end
			return false
		end
		return true
	end)
end
return {
	GuardsConsumer = GuardsConsumer,
}
