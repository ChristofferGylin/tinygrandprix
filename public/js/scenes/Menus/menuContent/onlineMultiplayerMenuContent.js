export const onlineMultiplayerMenuContent = {

    sceneName: 'OnlineMultiplayerMenu',

    menuItems: [
        {
            scene: 'OnlineMatchRandom',
            titleObject: null,
            displayTitle: 'MATCH WITH RANDOM OPPONENTS',
            data: { numberOfPlayers: 2 }
        },
        {
            scene: 'OnlinePlayWithFriends',
            titleObject: null,
            displayTitle: 'PLAY WITH FRIENDS',
            data: { numberOfPlayers: 3 }
        },
        {
            scene: 'TitleScreen',
            titleObject: null,
            displayTitle: 'BACK'
        },
    ],
}