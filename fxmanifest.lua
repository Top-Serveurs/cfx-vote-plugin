fx_version 'cerulean'
game 'common'

name 'vote'
description 'Vote plugin for Top-games.net/Top-serveurs.net platforms'
author 'Top-Games/Top-Serveurs'
version '3.0.1'
url 'https://github.com/Top-Serveurs/cfx-vote-plugin'


shared_script '@es_extended/imports.lua' -- Required if you use ESX Legacy

server_scripts {
    'vote.js',
    'example.lua',
    -- '@mysql-async/lib/MySQL.lua', -- Required if you use 'example_esx.lua'
    -- 'example_esx.lua',
    -- 'example_vorp.lua',
}
