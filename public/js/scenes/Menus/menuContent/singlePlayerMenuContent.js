export const singlePlayerMenuContent = {

    sceneName: 'SinglePlayerMenu',

    menuItems: [
        {
            scene: 'ComingSoon',
            titleObject: null,
            displayTitle: 'CAREER',
            data: undefined
        },
        {
            scene: 'SelectTrack',
            titleObject: null,
            displayTitle: 'SINGLE RACE',
            data: { numberOfPlayers: 1 }
        },
        {
            scene: 'SelectTrack',
            titleObject: null,
            displayTitle: 'HOTLAP',
            data: { numberOfPlayers: 1, hotlap: true }
        },
        {
            scene: 'TitleScreen',
            titleObject: null,
            displayTitle: 'BACK',
            data: undefined
        },
    ]
}