export const setUpControls = (scene) => {

    for (let i = 0; i < scene.inputControl.players.length; i++) {

        const keys = {

            throttle: scene.input.keyboard.addKey(scene.gameSettings.controls[i].keys.throttle),
            brake: scene.input.keyboard.addKey(scene.gameSettings.controls[i].keys.brake),
            left: scene.input.keyboard.addKey(scene.gameSettings.controls[i].keys.left),
            right: scene.input.keyboard.addKey(scene.gameSettings.controls[i].keys.right),
            reverse: scene.input.keyboard.addKey(scene.gameSettings.controls[i].keys.reverse),
            nitro: scene.input.keyboard.addKey(scene.gameSettings.controls[i].keys.nitro),
            zoom: scene.input.keyboard.addKey(scene.gameSettings.controls[i].keys.zoom),

        }

        scene.inputControl.players[i].controls.keys = keys;

    }
}