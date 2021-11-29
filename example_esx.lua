-- This is a basic example for ESX Framework (by Dolu).
-- This is just a demo, it's up to you to modify at your convenience.

local Config = {}
Config.Legacy       = false             -- If you're using ESX Legacy, set this to 'true'
Config.GiveCash     = 100               -- How many cash money do you want to give for 1 vote (0 = disabled)
Config.GiveBank     = 500               -- How many bank money do you want to give for 1 vote (0 = disabled)
Config.GiveOffline  = true              -- Do you want to give to offline characters? This is cool for gifts between players
Config.Debug        = 'TOP-SERVEURS'    -- The prefix for printing in the console everytime someone vote for the server (set to false to disable)
Config.DebugCommand = true              -- Enable the 'testvote' command to simulate a vote for a given name (example: /testvote John Wick)

-------------------------------------------------------------------------------

if not Config.Legacy then
    ESX = nil
    TriggerEvent('esx:getSharedObject', function(obj) ESX = obj end)
end

-- [debug] Custom print format (require 'Config.debug')
local debug = function(msg)
    if not Config.Debug then return end
    print('^7[^5'..Config.Debug..'^7] '..msg..'^7')
end

-- [debugCommand] Simulate a vote (require 'Config.debugCommand')
if Config.DebugCommand then
    RegisterCommand('testvote', function(_, args)
        local playername = args[1]..' '..args[2]
        debug('Simulated vote name field: ^5'..playername..'^7')
        TriggerEvent('onPlayerVote', playername)
    end, true)
end

-- Retrieve an connected player using vote name field (support upper and lower cases)
local getPlayerByName = function(playername)
    playername = string.lower(playername)
    if Config.Legacy then
        local xPlayers = ESX.GetExtendedPlayers()
        for _, xPlayer in pairs(xPlayers) do
            local xName = string.lower(xPlayer.getName())
            if xPlayer and xName == playername then
                return xPlayer
            end
        end
    else
        local xPlayers = ESX.GetPlayers()
        for _, id in ipairs(xPlayers) do
            local xPlayer = ESX.GetPlayerFromId(id)
            local xName = string.lower(xPlayer.getName())
            if xPlayer and xName == playername then
                return xPlayer
            end
        end
    end
    return false
end

AddEventHandler('onPlayerVote', function (playername, ip, date)
    local xPlayer = getPlayerByName(playername)

    -- If the player is currently playing
    if xPlayer then
            
        -- Give cash
        if Config.GiveCash > 0 then
            xPlayer.addMoney(Config.GiveCash)
        end

        -- Give bank
        if Config.GiveBank > 0 then
            xPlayer.addAccountMoney('bank', Config.GiveBank)
        end

        -- Notify player and print console
        if Config.GiveCash and not Config.GiveBank then
            xPlayer.showNotification('Thanks for your vote, you received ~g~$'..Config.GiveCash..'~s~ of cash money !')
            debug('Someone just voted for the server and '..xPlayer.getName()..' received ^5$'..Config.GiveCash..'^7 of cash money')

        elseif Config.GiveBank and not Config.GiveCash then
            xPlayer.showNotification('Thanks for your vote, you received ~g~$'..Config.GiveBank..'~s~ in your bank account!')
            debug('Someone just voted for the server and '..xPlayer.getName()..' received ^5$'..Config.GiveBank..'^7 in his bank account')

        elseif Config.GiveBank and Config.GiveCash then
            xPlayer.showNotification('Thanks for your vote, you received ~g~$'..Config.GiveCash..'~s~ of cash money and ~g~$'..Config.GiveBank..'~s~ in your bank account!')
            debug('Someone just voted for the server and '..xPlayer.getName()..' received ^5$'..Config.GiveCash..'^7 of cash money and ^5$'..Config.GiveBank..'^7 in his bank account')

        end

    -- If the player is offline (require 'Config.giveOffline')
    elseif Config.GiveOffline and (Config.GiveBank > 0 or Config.GiveCash > 0) then

        -- Get firstname & lastname from vote name field
        local foundFirstName, foundLastName = false, false
        for w in playername:gmatch("%S+") do
            if not foundFirstName then foundFirstName = w else foundLastName = w break end
        end

        -- Find identifier from firstname and lastname (people don't have to type the exact correct name, this query will find it anyway!)
        MySQL.Async.fetchAll('SELECT identifier, firstname, lastname, accounts FROM `users` WHERE `firstname` LIKE @firstname AND `lastname` LIKE @lastname', {
            ['@firstname'] = '%'..foundFirstName..'%',
            ['@lastname'] = '%'..foundLastName..'%'
        }, function(result)
            if result[1] then

                -- Add cash money to character accounts
                local playerAccounts = json.decode(result[1].accounts)
                if Config.GiveCash then
                    playerAccounts.money = playerAccounts.money + Config.GiveCash
                end

                -- Add bank money to character accounts
                if Config.GiveBank then
                    playerAccounts.bank = playerAccounts.bank + Config.GiveBank
                end

                MySQL.Async.execute('UPDATE users SET accounts = @accounts WHERE identifier = @identifier', {
                    ['@identifier'] =  result[1].identifier,
                    ['@accounts'] =  json.encode(playerAccounts),
                }, function(rowsChanged)
                    if rowsChanged > 0 then
                        if Config.GiveCash and not Config.GiveBank then
                            debug('Someone just voted for the server and '..result[1].firstname..' '..result[1].lastname..' (offline) received ^5$'..Config.GiveCash..'^7 of cash money')

                        elseif not Config.GiveCash and Config.GiveBank then
                            debug('Someone just voted for the server and '..result[1].firstname..' '..result[1].lastname..' (offline) received ^5$'..Config.GiveBank..'^7 in his bank account')

                        elseif Config.GiveCash and Config.GiveBank then
                            debug('Someone just voted for the server and '..result[1].firstname..' '..result[1].lastname..' (offline) received ^5$'..Config.GiveCash..'^7 of cash money and ^5$'..Config.GiveBank..'^7 in his bank account')

                        end
                        return
                    end
                end)
            else
                debug('Someone just voted for the server, but no player were found (entered name: '..tostring(playername)..')')
            end
        end)
    end
end)
