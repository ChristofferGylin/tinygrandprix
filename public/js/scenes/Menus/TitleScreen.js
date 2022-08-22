import { eventCenter } from "../../utils/eventCenter.js";
import { drawMenu } from "./drawMenu.js";
import { titleScreenMenuContent } from "./menuContent/titleScreenMenuContent.js";
import { setMenuTimeOut } from "./setMenuTimeOut.js";
import { setSelector } from "./setSelector.js";

export class TitleScreen extends Phaser.Scene {
    constructor() {
        super('TitleScreen');
    }

    init(data) {
        this.gameSettings = data.gameSettings;
        this.inputControl = data.inputControl;
    }

    preload() {


    }

    create() {

        this.cameras.main.setBackgroundColor(0x1720d1)
        this.menuTimeout = false;
        this.menuSelection = 0;
        this.textStyle = { fontFamily: 'Monospace', fontSize: 40, color: '#ebeced' };
        this.textStyleSelected = { fontFamily: 'Monospace', fontSize: 46, color: '#ffffff' };
        const gameWidth = this.game.config.width;
        const logo = this.add.image(gameWidth / 2, 20, 'logo').setOrigin(0.5, 0);
        this.menuContent = titleScreenMenuContent;
        let menuOffset = logo.getBottomCenter();

        drawMenu(this, menuOffset.y);
        setSelector(this);
        eventCenter.emit('bind-gamepad', 0);

    }

    update() {

        if (!this.inputControl.menuTimeout) {

            let lastSelection = this.menuSelection;

            if (this.inputControl.menu.input.sum.down) {

                if (this.menuSelection === this.menuContent.menuItems.length - 1) {


                    this.menuSelection = 0;

                } else {

                    this.menuSelection++;

                }

                setSelector(this, lastSelection);

            }

            if (this.inputControl.menu.input.sum.up) {

                if (this.menuSelection === 0) {

                    this.menuSelection = this.menuContent.menuItems.length - 1;

                } else {

                    this.menuSelection--;

                }

                setSelector(this, lastSelection);

            }

            if (this.inputControl.menu.input.sum.select) {

                setMenuTimeOut(this);

                const data = { gameSettings: this.gameSettings, inputControl: this.inputControl }
                this.scene.launch(this.menuContent.menuItems[this.menuSelection].scene, data);
                this.scene.stop('TitleScreen');

            }
        }
    }
}