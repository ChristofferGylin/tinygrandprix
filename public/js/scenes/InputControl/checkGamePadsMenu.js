export const checkGamePadsMenu = (player) => {

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
        player.inputMenu.gamePad.select = true;
    } else {
        player.inputMenu.gamePad.select = false;
    }

    if (controllerMap8BitDoSN30.Y) {
        player.inputMenu.gamePad.back = true;
    } else {
        player.inputMenu.gamePad.back = false;
    }

    if (controllerMap8BitDoSN30.xAxis.getValue() === -1) {
        player.inputMenu.gamePad.left = true;
    } else {
        player.inputMenu.gamePad.left = false;
    }

    if (controllerMap8BitDoSN30.xAxis.getValue() === 1) {
        player.inputMenu.gamePad.right = true;
    } else {
        player.inputMenu.gamePad.right = false;
    }

    if (controllerMap8BitDoSN30.yAxis.getValue() === -1) {
        player.inputMenu.gamePad.up = true;
    } else {
        player.inputMenu.gamePad.up = false;
    }

    if (controllerMap8BitDoSN30.yAxis.getValue() === 1) {
        player.inputMenu.gamePad.down = true;
    } else {
        player.inputMenu.gamePad.down = false;
    }

}