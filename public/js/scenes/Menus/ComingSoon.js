import { eventCenter } from "../../utils/eventCenter.js";
import { setSelector } from "./setSelector.js";
import { drawMenu } from "./drawMenu.js";
import { carSelector } from "./carSelector.js";
import { setMenuTimeOut } from "./setMenuTimeOut.js";
import { drawCarMenu } from "./drawCarMenu.js";

export class ComingSoon extends Phaser.Scene {
    constructor(config) {
        super('ComingSoon');
        this.menuContent = config.menuContent;

    }

    init(data) {

        this.gameConfig = data;
        this.gameSettings = data.gameSettings;
        this.inputControl = data.inputControl;

    }

    create() {


        const gameWidth = this.game.config.width;
        const gameHeight = this.game.config.height;
        this.cameras.main.setBackgroundColor(0x1720d1)
        this.menuSelection = 0;
        this.textStyle = { fontFamily: 'Monospace', fontSize: 40, color: '#ebeced' };
        this.headlineStyle = { fontFamily: 'Monospace', fontSize: 56, color: '#ffffff' };
        this.textStyleSelected = { fontFamily: 'Monospace', fontSize: 46, color: '#ffffff' };

        const titleText = this.add.text(gameWidth / 2, gameHeight / 2, 'COMING SOON! MAYBE...', this.headlineStyle).setOrigin(0.5, 0.5).setShadow(2, 2, 'black', 0, true);

        drawMenu(this, titleText.y);
        setSelector(this);

    }

    update() {

        if (!this.inputControl.menuTimeout) {

            if (this.inputControl.menu.input.sum.select) {

                setMenuTimeOut(this);

                let data;
                if (this.menuContent.menuItems[this.menuSelection].data === undefined) {

                    data = { gameSettings: this.gameSettings, inputControl: this.inputControl }

                } else {

                    this.menuContent.menuItems[this.menuSelection].data.gameSettings = this.gameSettings;
                    this.menuContent.menuItems[this.menuSelection].data.inputControl = this.inputControl;
                    data = this.menuContent.menuItems[this.menuSelection].data;
                }

                this.scene.launch(this.menuContent.menuItems[this.menuSelection].scene, data);
                this.scene.stop(this.menuContent.sceneName);

            }

            if (this.inputControl.menu.input.sum.back) {
                setMenuTimeOut(this);
                this.scene.launch(this.menuContent.menuItems[this.menuContent.menuItems.length - 1].scene, { gameSettings: this.gameSettings, inputControl: this.inputControl });
                this.scene.stop(this.menuContent.sceneName);

            }

        }

    }
}