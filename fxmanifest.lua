fx_version 'adamant'
game 'common'

name 'vote'
description 'Vote plugin for Top-games.net/Top-serveurs.net platforms'
author 'Top-Games/Top-Serveurs'
version '1.0.0'
url 'https://github.com/Top-Serveurs/cfx-vote-plugin'

server_script 'vote.js'
server_script 'example.lua'

client_script 'vote-ui.js'

files {
    'ui/js/app.js',
    'ui/index.html',
}

ui_page 'ui/index.html'