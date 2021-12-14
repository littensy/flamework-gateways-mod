-- Compiled with roblox-ts v1.2.7
local function isCtor(object)
	if not (type(object) == "table") then
		return false
	end
	local _arg0 = rawget(object, "new")
	return type(_arg0) == "function"
end
local function resolveCtor(ctor)
	if isCtor(ctor) then
		return ctor.new()
	else
		return ctor
	end
end
return {
	isCtor = isCtor,
	resolveCtor = resolveCtor,
}
