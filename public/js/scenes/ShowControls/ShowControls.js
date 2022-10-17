
import { setUpHUD } from './setUpHUD.js';


export class ShowControls extends Phaser.Scene {

    constructor() {
        super('ShowControls');
    }

    init(gameConfig) {

        this.gameConfig = gameConfig;
        this.gameSettings = gameConfig.gameSettings;
        this.inputControl = gameConfig.inputControl;

        console.log('this.gameConfig from ShowControls')
        console.log(this.gameConfig)

    }

    preload() {



    }

    create() {

        // Set up Player HUDs

        setUpHUD(this);

        this.startGame = () => {

            if (!this.inputControl.menuTimeout) {

                if (this.gameConfig.hotlap) {

                    this.scene.launch('GameSceneHotlap', this.gameConfig);

                } else {

                    this.scene.launch('GameScene', this.gameConfig);

                }

                this.scene.stop('ShowControls');

            }
        }

        // window.addEventListener('keyup', this.startGame)
        // window.addEventListener('click', this.startGame)
    }

    update() {

        if (!this.inputControl.menuTimeout) {

            if (this.inputControl.menu.input.sum.down) this.startGame();
            if (this.inputControl.menu.input.sum.up) this.startGame();
            if (this.inputControl.menu.input.sum.select) this.startGame();
            if (this.inputControl.menu.input.sum.back) this.startGame();

        }

    }
}