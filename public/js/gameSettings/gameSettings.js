import { player1 } from './controls/player1.js';
import { player2 } from './controls/player2.js';
import { player3 } from './controls/player3.js';
import { player4 } from './controls/player4.js';

export const gameSettings = {

    horizontalSplitscreen: false,
    controls: [player1, player2, player3, player4],
    players: [
        { name: 'Player 1', controls: player1, gamepad: undefined },
        { name: 'Player 2', controls: player2, gamepad: undefined },
        { name: 'Player 3', controls: player3, gamepad: undefined },
        { name: 'Player 4', controls: player4, gamepad: undefined }
    ],

};