import { setMenuTimeOut } from "./setMenuTimeOut.js";
import { setSelector } from "./setSelector.js";
import { drawMenu } from "./drawMenu.js";

export class Menu extends Phaser.Scene {
    constructor(config) {
        super(config.name);
        this.menuContent = config.menuContent;

    }



    init(data) {

        this.gameSettings = data.gameSettings;
        this.inputControl = data.inputControl;

    }

    create() {

        this.cameras.main.setBackgroundColor(0x1720d1)
        this.menuSelection = 0;
        this.textStyle = { fontFamily: 'Monospace', fontSize: 40, color: '#ebeced' };
        this.textStyleSelected = { fontFamily: 'Monospace', fontSize: 46, color: '#ffffff' };

        drawMenu(this);
        setSelector(this);

    }

    update() {

        if (!this.inputControl.menuTimeout) {

            let lastSelection = this.menuSelection;

            if (this.inputControl.menu.input.sum.down) {

                setMenuTimeOut(this);

                if (this.menuSelection === this.menuContent.menuItems.length - 1) {


                    this.menuSelection = 0;

                } else {

                    this.menuSelection++;

                }

                setSelector(this, lastSelection);

            }

            if (this.inputControl.menu.input.sum.up) {

                setMenuTimeOut(this);

                if (this.menuSelection === 0) {

                    this.menuSelection = this.menuContent.menuItems.length - 1;

                } else {

                    this.menuSelection--;

                }

                setSelector(this, lastSelection);

            }

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