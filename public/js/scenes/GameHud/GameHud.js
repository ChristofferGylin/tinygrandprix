import { checkGameScene } from './checkGameScene.js';
import { setUpPause } from './setUpPause.js';
import { hideScoreBoard } from '../../scoreBoard/hideScoreBoard.js';
import { setUpScoreBoard } from '../../scoreBoard/setUpScoreBoard.js';
import { setUpHUD } from './setUpHUD.js';
import { updateHUD } from './updateHUD.js';

export class GameHud extends Phaser.Scene {

    constructor() {
        super('GameHud');
    }

    init(GameScene) {

        this.raceSession = GameScene.raceSession;
        this.gameConfig = GameScene.gameConfig;
    }

    preload() {

        this.load.atlas('cars', 'assets/tilesets/cars.png', 'assets/tilemaps/cars.json');

    }

    create() {

        // Pause function 

        setUpPause(this);


        // Set up Player HUDs

        setUpHUD(this);


        // Set up Score Board

        setUpScoreBoard(this);
        hideScoreBoard(this.raceSession);


        // Set up Game Message

        this.raceSession.gameMessageText = this.add.text(1280 / 2, 720 / 2, '', { fontFamily: 'Monospace', fontSize: 76, color: 'white', align: 'center' });
        this.raceSession.gameMessageText.setOrigin(0.5);
        this.raceSession.gameMessageText.setShadow(2, 2, 'black', 0, true);


        // Check if GameScene is fully loaded before starting game

        checkGameScene(this);
    }

    update() {

        updateHUD(this);

    }
}