-- Compiled with roblox-ts v1.2.7
local function callObjectProperty(object, property, ...)
	local args = { ... }
	if not (object[property] ~= nil) then
		error('Property "' .. (property .. ('" does not exist on object "' .. (tostring(object) .. '"'))))
	end
	local value = object[property]
	if not (type(value) == "function") then
		error('Property "' .. (property .. ('" on object "' .. (tostring(object) .. '" is not a function'))))
	end
	return value(unpack(args))
end
return {
	callObjectProperty = callObjectProperty,
}
