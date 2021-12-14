-- Compiled with roblox-ts v1.2.7
local AdminGuard
do
	AdminGuard = setmetatable({}, {
		__tostring = function()
			return "AdminGuard"
		end,
	})
	AdminGuard.__index = AdminGuard
	function AdminGuard.new(...)
		local self = setmetatable({}, AdminGuard)
		return self:constructor(...) or self
	end
	function AdminGuard:constructor(admins)
		self.admins = admins
	end
	function AdminGuard:canActivate(context)
		local _admins = self.admins
		local _name = context:getPlayer().Name
		local isAdmin = table.find(_admins, _name) ~= nil
		print("(AdminGuard) " .. (context:getPlayer().Name .. (" is " .. ((isAdmin and "" or "not ") .. "an admin"))))
		return isAdmin
	end
end
return {
	AdminGuard = AdminGuard,
}
