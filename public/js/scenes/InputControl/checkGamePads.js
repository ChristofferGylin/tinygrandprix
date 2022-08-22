export const checkGamePads = (player) => {

    // Check if controller exists

    if (!player.controls.gamePad) {
        return
    }

    const controllerMap8BitDoSN30 = {

        A: player.controls.gamePad.buttons[0].pressed,
        B: player.controls.gamePad.buttons[1].pressed,
        X: player.controls.gamePad.buttons[3].pressed,
        Y: player.controls.gamePad.buttons[4].pressed,
        L: player.controls.gamePad.buttons[6].pressed,
        R: player.controls.gamePad.buttons[7].pressed,
        select: player.controls.gamePad.buttons[10].pressed,
        start: player.controls.gamePad.buttons[11].pressed,
        xAxis: player.controls.gamePad.axes[0],
        yAxis: player.controls.gamePad.axes[1],

    }

    if (controllerMap8BitDoSN30.B) {
        player.input.gamePad.throttle = 1;
    } else {
        player.input.gamePad.throttle = 0;
    }

    if (controllerMap8BitDoSN30.Y) {
        player.input.gamePad.brake = 1;
    } else {
        player.input.gamePad.brake = 0;
    }



    if (controllerMap8BitDoSN30.xAxis.getValue() === -1 || controllerMap8BitDoSN30.xAxis.getValue() === 1) {
        player.input.gamePad.direction = controllerMap8BitDoSN30.xAxis.getValue();
    } else {
        player.input.gamePad.direction = 0;
    }

    if (controllerMap8BitDoSN30.select) {
        player.input.gamePad.snapshot = true;
    } else {
        player.input.gamePad.snapshot = false;
    }
}