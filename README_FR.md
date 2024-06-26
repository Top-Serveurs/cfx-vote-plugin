# Plugin de votes pour serveur GTA V FIVEM / RDR2 Redm (Cfx)

- [:us: English documentation](./README.md)
- [:fr: Documentation française](./README_FR.md)

Ceci est le plugin de votes de Top-Serveurs (https://top-serveurs.net) qui sert à réceptionner les votes directement sur votre serveur FIVEM. Lorsqu'un joueur vote, Top-Serveurs notifie directement votre serveur et vous pouvez ainsi récompenser vos joueurs ou effectuer un clasement des meilleurs voteurs (par exemple), les possibilités sont infinies.

Mais à quoi sert FiveM ? [FiveM](https://top-serveurs.net/gta/type/fivem) vous permet de créer un serveur GTA, vous pouvez trouver notamment un serveur [GTA 5 RP](https://top-serveurs.net/gta/type/roleplay) sur notre site.

## Fonctionnalités

- Event `onPlayerVote` permettant la réception des votes effectués sur votre fiche serveur en temps réel ! Ceci permet donc d'effectuer des actions en conséquence. Exemple : récompenser les voteurs.

## Installation

1. Copiez le dossier `cfx-vote-plugin` dans le dossier `resources` de votre serveur Fivem/RedM

2. Pensez à bien ouvrir le port choisi (par exemple 8192) en UDP sur votre serveur/firewall

3. Configurez le plugin de vote dans votre fichier `server.cfg` comme ceci :

```ini
ensure cfx-vote-plugin
# La token est obligatoire. C'est la token de votre fiche serveur disponible sur votre panel https://gta.top-serveurs.net
set vote_token "XXXXXXXXX"
# Le port d'écoute du plugin. Par défaut, c'est le port 8192 mais vous pouvez spécifier celui que vous voulez. N'oubliez pas de le configurer aussi sur le panel de gestion de votre serveur sur https://gta.top-serveurs.net
set vote_port "8192"
```

4. Utilisez l'event `onPlayerVote` pour réceptionner les votes effectués. Des exemples sont disponibles dans le fichier `example.lua`, dans le fichier `example_vorp.lua` pour un exemple avec le framework VORP et un autre dans le fichier `example_esx.lua` pour un petit exemple avec ESX (pensez à supprimer les fichiers exemples dont vous n'avez pas besoin). Aussi, voici un simple exemple :

```lua
AddEventHandler('onPlayerVote', function (playername, ip, date)
    -- Ajouter ici des actions lorsqu'un vote est perçu.
    -- Par exemple : donner de l'argent In-Game, donner des points, enregistrer en BDD, ...
    print(playername)
    print(ip)
    print(date)
end)
```

5. Démarrez votre serveur. Si vous voyez le message `[VotePlugin] Plugin de vote actif sur le port xxxx`, tout est bon !

6. Dernière étape : activez le plugin de vote sur le panel de gestion de votre fiche serveur. Rendez-vous sur https://top-serveurs.net/gta dans la gestion de votre serveur, en bas il y a une section `Plugin de vote`. Vous devez activer le plugin et spécifier le port que vous avez indiqué plus haut dans votre fichier `server.cfg`. Une fois le plugin activé, vous pouvez cliquer sur le bouton pour tester la connectivité et ensuite à vous de jouer !


## Aide & Suggestions

Si vous avez besoin d'aide sur la mise en place du plugin ou si vous avez des suggestions, n'hésitez pas à nous contacter ici : https://gta.top-serveurs.net/contact ou à gta@top-serveurs.net.

## Contributeurs

Merci à nos contributeurs qui nous aident à améliorer le plugin :
- [@meyervp](https://github.com/meyervp)
- [@Dolu (DoluTattoo)](https://github.com/dolutattoo)
- [@Benjamin7222](https://github.com/Benjamin7222)
