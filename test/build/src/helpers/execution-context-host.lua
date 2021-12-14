-- Compiled with roblox-ts v1.2.7
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("TS"):WaitForChild("RuntimeLib"))
local Reflect = TS.import(script, TS.getModule(script, "@flamework", "core").out).Reflect
local _constants = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "node_modules", "flamework-gateways-mod", "constants")
local IS_ON_EVENT_METADATA = _constants.IS_ON_EVENT_METADATA
local IS_ON_INVOKE_METADATA = _constants.IS_ON_INVOKE_METADATA
local ExecutionContextHost
do
	ExecutionContextHost = setmetatable({}, {
		__tostring = function()
			return "ExecutionContextHost"
		end,
	})
	ExecutionContextHost.__index = ExecutionContextHost
	function ExecutionContextHost.new(...)
		local self = setmetatable({}, ExecutionContextHost)
		return self:constructor(...) or self
	end
	function ExecutionContextHost:constructor(args, descriptor, player)
		self.args = args
		self.descriptor = descriptor
		self.player = player
	end
	function ExecutionContextHost:getClass()
		return self.descriptor.object
	end
	function ExecutionContextHost:getRemoteName()
		return self.descriptor.property
	end
	function ExecutionContextHost:getRemoteType()
		return Reflect.hasMetadata(self.descriptor.object, IS_ON_EVENT_METADATA .. ("." .. self.descriptor.property)) and "event" or (Reflect.hasMetadata(self.descriptor.object, IS_ON_INVOKE_METADATA .. ("." .. self.descriptor.property)) and "invoke" or error("Cannot get remote type for '" .. (self.descriptor.property .. "'")))
	end
	function ExecutionContextHost:getArgs()
		return self.args
	end
	function ExecutionContextHost:getArgByIndex(index)
		return self.args[index + 1]
	end
	function ExecutionContextHost:getDescriptor()
		return self.descriptor
	end
	function ExecutionContextHost:getPlayer()
		if not self.player then
			error("Cannot get player for '" .. (self.descriptor.property .. "', a client event"))
		end
		return self.player
	end
end
return {
	ExecutionContextHost = ExecutionContextHost,
}
