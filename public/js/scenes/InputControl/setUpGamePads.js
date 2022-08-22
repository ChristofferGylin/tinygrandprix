import { setMenuTimeOut } from "../Menus/setMenuTimeOut.js";
import { checkGamePad8BitDo } from "./checkGamePad8BitDo.js";
import { checkGamePadXbox } from "./checkGamePadXbox.js";

export const setUpGamePads = (playerNumber, scene) => {

    scene.input.gamepad.once('down', (pad, button, index) => {

        if (!scene.inputControl.menuTimeOut) {

            setMenuTimeOut(scene);
            scene.inputControl.players[playerNumber].controls.gamePad = pad;
            scene.inputControl.players[playerNumber].hasGamePad = true;

            if (pad.id.includes('8Bitdo SN30')) {

                scene.inputControl.players[playerNumber].checkGamePad = checkGamePad8BitDo;

            } else if (pad.id.includes('Xbox')) {

                scene.inputControl.players[playerNumber].checkGamePad = checkGamePadXbox;

            } else {

                console.log('Unknown Controller')

            }
            console.log(scene);

        } else {

            setTimeout((playerNumber, scene) => {

                setUpGamePads(playerNumber, scene)

            }, 50, playerNumber, scene)

        }

    }, scene);

}