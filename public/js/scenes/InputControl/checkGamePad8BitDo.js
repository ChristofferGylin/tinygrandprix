export const checkGamePad8BitDo = () => {

    // Check if controller exists

    if (!this.controls.gamePad) {
        return
    }

    const controllerMap8BitDoSN30 = {

        A: this.controls.gamePad.buttons[0].pressed,
        B: this.controls.gamePad.buttons[1].pressed,
        X: this.controls.gamePad.buttons[3].pressed,
        Y: this.controls.gamePad.buttons[4].pressed,
        L: this.controls.gamePad.buttons[6].pressed,
        R: this.controls.gamePad.buttons[7].pressed,
        select: this.controls.gamePad.buttons[10].pressed,
        start: this.controls.gamePad.buttons[11].pressed,
        xAxis: this.controls.gamePad.axes[0],
        yAxis: this.controls.gamePad.axes[1],

    }

    if (controllerMap8BitDoSN30.B) {
        this.input.gamePad.throttle = 1;
    } else {
        this.input.gamePad.throttle = 0;
    }

    if (controllerMap8BitDoSN30.Y) {
        this.input.gamePad.brake = 1;
    } else {
        this.input.gamePad.brake = 0;
    }



    if (controllerMap8BitDoSN30.xAxis.getValue() === -1 || controllerMap8BitDoSN30.xAxis.getValue() === 1) {
        this.input.gamePad.direction = controllerMap8BitDoSN30.xAxis.getValue();
    } else {
        this.input.gamePad.direction = 0;
    }

    if (controllerMap8BitDoSN30.select) {
        this.input.gamePad.snapshot = true;
    } else {
        this.input.gamePad.snapshot = false;
    }
}