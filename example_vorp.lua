-- This is a basic example for VORP Framework.
-- This is just a demo, it's up to you to modify at your convenience.

local VORPcore = exports.vorp_core:GetCore() -- NEW includes new callback system

TriggerEvent("getCore", function(core)
    VorpCore = core
end)

AddEventHandler('onPlayerVote', function (playerName, ip, date)
    -- Display vote information in the server console
    print(playername)
    print(ip)
    print(date)

    -- Get the VORP user object for the specified player
    local users = VORPcore.getUsers()
    for _, user in pairs(users) do
        local playerData = VORPcore.getUser(user.source).getUsedCharacter
        if playerData.firstname .. " " .. playerData.lastname == playerName then
            exports.vorp_inventory:addItem(user.source, "goldbar", 3)
            print("A gold bar has been added to the inventory of " .. playerName)
        else
            print("Player not found: " .. playerName)
        end
    end
end)


