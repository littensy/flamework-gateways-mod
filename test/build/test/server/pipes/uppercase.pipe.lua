-- Compiled with roblox-ts v1.2.7
local UppercasePipe
do
	UppercasePipe = setmetatable({}, {
		__tostring = function()
			return "UppercasePipe"
		end,
	})
	UppercasePipe.__index = UppercasePipe
	function UppercasePipe.new(...)
		local self = setmetatable({}, UppercasePipe)
		return self:constructor(...) or self
	end
	function UppercasePipe:constructor()
	end
	function UppercasePipe:transform(value, _context)
		local _arg0 = type(value) == "string"
		assert(_arg0, "(UppercasePipe) Value must be a string")
		print("(UppercasePipe) Changing " .. (value .. (" to " .. string.upper(value))))
		return string.upper(value)
	end
end
return {
	UppercasePipe = UppercasePipe,
}
