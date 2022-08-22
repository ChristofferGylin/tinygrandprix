export function checkGamePadXbox() {

    // Check if controller exists

    if (!this.controls.gamePad) {
        return
    }

    const xBox = {

        A: this.controls.gamePad.buttons[0].pressed,
        B: this.controls.gamePad.buttons[1].pressed,
        X: this.controls.gamePad.buttons[2].pressed,
        Y: this.controls.gamePad.buttons[3].pressed,
        L: this.controls.gamePad.buttons[4].pressed,
        R: this.controls.gamePad.buttons[5].pressed,
        select: this.controls.gamePad.buttons[8].pressed,
        start: this.controls.gamePad.buttons[9].pressed,
        xAxis: this.controls.gamePad.axes[0],
        yAxis: this.controls.gamePad.axes[1],
        brake: this.controls.gamePad.buttons[6],
        throttle: this.controls.gamePad.buttons[7],

    }

    if (xBox.throttle.value > 0.1) {
        this.input.gamePad.throttle = xBox.throttle.value;
    } else {
        this.input.gamePad.throttle = 0;
    }

    if (xBox.brake.value > 0.1) {
        this.input.gamePad.brake = xBox.brake.value;
    } else {
        this.input.gamePad.brake = 0;
    }



    if (xBox.xAxis.getValue() < -0.1 || xBox.xAxis.getValue() > 0.1) {
        this.input.gamePad.direction = xBox.xAxis.getValue();
    } else {
        this.input.gamePad.direction = 0;
    }

    if (xBox.select) {
        this.input.gamePad.snapshot = true;
    } else {
        this.input.gamePad.snapshot = false;
    }
}