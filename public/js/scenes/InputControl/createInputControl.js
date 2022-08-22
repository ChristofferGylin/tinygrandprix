import { inputControlObject } from "./inputControlObject.js";
import { PlayerInput } from "./PlayerInput.js";

export const createInputControl = (scene) => {

    scene.inputControl = inputControlObject;


    for (let i = 0; i < 4; i++) {

        let playerInput = new PlayerInput(i);
        scene.inputControl.players.push(playerInput);

    }

}