import { eventCenter } from "../../utils/eventCenter.js";
import { setUpControls } from "./setUpControls.js";
import { setUpMenuControls } from './setUpMenuControls.js'
import { sumInput } from './sumInput.js';
import { setUpGamePads } from "./setUpGamePads.js";
import { checkGamePads } from "./checkGamePads.js";
import { checkGamePadsMenu } from "./checkGamePadsMenu.js";
import { checkKeysMenu } from "./checkKeysMenu.js";
import { sumInputsMenu } from "./sumInputsMenu.js";
import { createInputControl } from "./createInputControl.js";
import { checkKeys } from "./checkKeys.js";

export class InputControl extends Phaser.Scene {
    constructor() {
        super('InputControl');
    }

    init(data) {

        this.gameSettings = data.gameSettings;

    }

    create() {

        createInputControl(this);
        setUpControls(this);

        eventCenter.on('bind-gamepad', (playerNumber) => {
            setUpGamePads(playerNumber, this)
        }, this);

        this.inputControl.menu.controls = setUpMenuControls(this);
        this.scene.launch('TitleScreen', { gameSettings: this.gameSettings, inputControl: this.inputControl });

    }

    update() {

        if (this.inputControl.isInMenu) {

            for (let i = 0; i < this.inputControl.players.length; i++) {

                checkGamePadsMenu(this.inputControl.players[i]);

            }

            checkKeysMenu(this);
            sumInputsMenu(this);

        } else {

            for (let i = 0; i < this.inputControl.players.length; i++) {


                if (this.inputControl.players[i].hasGamePad) {

                    this.inputControl.players[i].checkGamePad();

                }

                checkKeys(this.inputControl.players[i]);
                sumInput(this.inputControl.players[i]);

            }
        }
    }
}