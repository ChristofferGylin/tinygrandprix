import { eventCenter } from "../../utils/eventCenter.js";
import { setSelector } from "./setSelector.js";
import { drawMenu } from "./drawMenu.js";
import { carSelector } from "./carSelector.js";
import { setMenuTimeOut } from "./setMenuTimeOut.js";
import { drawCarMenu } from "./drawCarMenu.js";

export class SelectCar extends Phaser.Scene {
    constructor(config) {
        super('SelectCar');
        this.menuContent = config.menuContent;

    }

    init(data) {

        this.gameConfig = data;
        this.gameSettings = data.gameSettings;
        this.inputControl = data.inputControl;

    }

    create() {

        this.selectedCar = 0;
        this.currentPlayer = 0;
        const gameWidth = this.game.config.width;
        const gameHeight = this.game.config.height;
        this.cameras.main.setBackgroundColor(0x1720d1)
        this.menuSelection = 0;
        this.textStyle = { fontFamily: 'Monospace', fontSize: 40, color: '#ebeced' };
        this.headlineStyle = { fontFamily: 'Monospace', fontSize: 56, color: '#ffffff' };
        this.textStyleSelected = { fontFamily: 'Monospace', fontSize: 46, color: '#ffffff' };
        this.playerNameTitle = this.add.text(gameWidth / 2, 10, this.gameSettings.players[0].name, this.textStyle).setOrigin(0.5, 0).setShadow(2, 2, 'black', 0, true);
        this.add.text(gameWidth / 2, 56, 'SELECT CAR', this.headlineStyle).setOrigin(0.5, 0).setShadow(2, 2, 'black', 0, true);
        this.gamePadText = this.add.text(gameWidth / 2, gameHeight - 20, '', this.textStyle).setOrigin(0.5, 1).setShadow(2, 2, 'black', 0, true);

        if (this.inputControl.players[0].controls.gamePad === null) {

            this.gamePadText.setText('PRESS A BUTTON ON A GAMEPAD TO BIND TO PLAYER 1');

        }

        const players = [];

        for (let i = 0; i < this.gameConfig.numberOfPlayers; i++) {

            const player = { name: this.gameSettings.players[i].name };
            players.push(player);

        }

        this.gameConfig.players = players;
        this.numberOfCars = 6;
        this.numberOfCells = 3;
        this.numberOfRows = 1;
        this.currentRow = 1;
        this.currentCell = 1;
        this.scaleFactor = 2;
        this.bigCellDimension = (53 * this.scaleFactor) - 1
        this.selectorPosition;

        drawCarMenu(this);
        drawMenu(this, this.yPoint + this.selectionGridHeight);
        setSelector(this);

    }

    update() {

        if (!this.inputControl.menuTimeout) {

            if (this.inputControl.menu.input.sum.down) {

                setMenuTimeOut(this);
                carSelector(this, 'down');

            }

            if (this.inputControl.menu.input.sum.up) {

                setMenuTimeOut(this);
                carSelector(this, 'up');

            }

            if (this.inputControl.menu.input.sum.left) {

                setMenuTimeOut(this);
                carSelector(this, 'left');

            } else if (this.inputControl.menu.input.sum.right) {

                setMenuTimeOut(this);
                carSelector(this, 'right');

            }

            if (this.inputControl.menu.input.sum.select) {

                setMenuTimeOut(this);

                this.gameConfig.players[this.currentPlayer].car = this.selectedCar;

                if (this.currentPlayer + 1 === this.gameConfig.numberOfPlayers) {

                    if (this.gameConfig.hotlap) {

                        this.scene.launch('GameSceneHotlap', this.gameConfig);

                    } else {

                        this.scene.launch(this.menuContent.menuItems[this.menuSelection].scene, this.gameConfig);

                    }


                    this.scene.stop(this.menuContent.sceneName);

                } else {

                    this.currentPlayer++;
                    this.selector.x = this.selectorStartPosition.x;
                    this.selector.y = this.selectorStartPosition.y;
                    this.selectedCar = 0;
                    this.currentCell = 1;
                    this.currentRow = 1;
                    this.playerNameTitle.setText(this.gameConfig.players[this.currentPlayer].name);

                    if (this.inputControl.players[this.currentPlayer].controls.gamePad === null) {

                        this.gamePadText.setText(`PRESS A BUTTON ON A GAMEPAD TO BIND TO PLAYER ${this.currentPlayer + 1}`);
                        eventCenter.emit('bind-gamepad', this.currentPlayer);

                    } else {

                        this.gamePadText.setText(``);

                    }

                    switch (this.currentPlayer) {

                        case 1:
                            this.selector.setFrame('selector-red.png');
                            break;

                        case 2:
                            this.selector.setFrame('selector-blue.png');
                            break;

                        case 3:
                            this.selector.setFrame('selector-yellow.png');
                            break;
                    }
                }
            }

            if (this.inputControl.menu.input.sum.back) {

                setMenuTimeOut(this);
                this.scene.launch(this.menuContent.menuItems[this.menuContent.menuItems.length - 1].scene, this.gameConfig);
                this.scene.stop(this.menuContent.sceneName);

            }
        }
    }
}