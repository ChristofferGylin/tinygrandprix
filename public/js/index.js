import { GameScene } from './scenes/GameScene/GameScene.js';
import { GameSceneHotLap } from './scenes/GameSceneHotlap/GameSceneHotlap.js';
import { GameHud } from './scenes/GameHud/GameHud.js';
import { GamePreLoader } from './scenes/GamePreLoader/GamePreLoader.js';
import { InputControl } from './scenes/InputControl/InputControl.js';
import { ShowControls } from './scenes/ShowControls/ShowControls.js';
import { TitleScreen } from './scenes/Menus/TitleScreen.js';
import { Menu } from './scenes/Menus/Menu.js';
import { Credits } from './scenes/Menus/credits.js';
import { SelectTrack } from './scenes/Menus/SelectTrack.js';
import { SelectCar } from './scenes/Menus/SelectCar.js';
import { singlePlayerMenuContent } from './scenes/Menus/menuContent/singlePlayerMenuContent.js';
import { localMultiplayerMenuContent } from './scenes/Menus/menuContent/localMultiplayerMenuContent.js';
import { onlineMultiplayerMenuContent } from './scenes/Menus/menuContent/onlineMultiplayerMenuContent.js';
import { selectTrackMenuContent } from './scenes/Menus/menuContent/selectTrackMenuContent.js';
import { selectCarMenuContent } from './scenes/Menus/menuContent/selectCarMenuContent.js';
import { comingSoonMenuContent } from './scenes/Menus/menuContent/comingSoonMenuContent.js';
import { ComingSoon } from './scenes/Menus/ComingSoon.js';

let gameScene = new GameScene();
let gameSceneHotLap = new GameSceneHotLap();
let gameHud = new GameHud();
let gamePreLoader = new GamePreLoader();
let inputControl = new InputControl();
let showControls = new ShowControls();
let titleScreen = new TitleScreen();
let singlePlayerMenu = new Menu({ name: 'SinglePlayerMenu', menuContent: singlePlayerMenuContent });
let localMultiplayerMenu = new Menu({ name: 'LocalMultiplayerMenu', menuContent: localMultiplayerMenuContent });
let onlineMultiplayerMenu = new Menu({ name: 'OnlineMultiplayerMenu', menuContent: onlineMultiplayerMenuContent });
let credits = new Credits();
let selectTrack = new SelectTrack({ name: 'SelectTrack', menuContent: selectTrackMenuContent });
let selectCar = new SelectCar({ name: 'SelectCar', menuContent: selectCarMenuContent });
let comingSoon = new ComingSoon({ name: 'ComingSoon', menuContent: comingSoonMenuContent });


//const screenWidth = Math.round(window.innerWidth * 0.98);
//const screenHeight = Math.round(window.innerHeight * 0.96);
const config = {

    type: Phaser.AUTO,
    width: 1280,
    height: 720,
    antialias: true,
    pixelArt: false,
    input: {
        gamepad: true
    },
    parent: 'gameContainer',
    fps: {
        target: 60,
        forceSetTimeOut: true

    },
    physics: {
        default: 'matter',
        matter: {
            debug: {
                showBody: false,
                showStaticBody: false
            },
            gravity: false
        },

    },


};

const game = new Phaser.Game(config);
game.scene.add('InputControl', inputControl);
game.scene.add('GameScene', gameScene);
game.scene.add('GameSceneHotlap', gameSceneHotLap);
game.scene.add('GameHud', gameHud);
game.scene.add('TitleScene', titleScreen);
game.scene.add('GamePreLoader', gamePreLoader);
game.scene.add('SinglePlayerMenu', singlePlayerMenu);
game.scene.add('LocalMultiplayerMenu', localMultiplayerMenu);
game.scene.add('OnlineMultiplayerMenu', onlineMultiplayerMenu);
game.scene.add('Credits', credits);
game.scene.add('SelectTrack', selectTrack);
game.scene.add('SelectCar', selectCar);
game.scene.add('ComingSoon', comingSoon);
game.scene.add('ShowControls', showControls);

game.scene.start('GamePreLoader');

