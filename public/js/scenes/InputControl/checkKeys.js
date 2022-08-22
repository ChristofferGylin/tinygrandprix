export const checkKeys = (player) => {

    if (player.controls.keys.left.isDown) {

        player.input.keys.left = true;

    } else {

        player.input.keys.left = false;

    }

    if (player.controls.keys.right.isDown) {

        player.input.keys.right = true;

    } else {

        player.input.keys.right = false;

    }

    if (player.controls.keys.throttle.isDown) {

        player.input.keys.throttle = true;

    } else {

        player.input.keys.throttle = false;

    }

    if (player.controls.keys.reverse.isDown) {

        player.input.keys.reverse = true;

    } else {

        player.input.keys.reverse = false;

    }

    if (player.controls.keys.brake.isDown) {

        player.input.keys.brake = true;

    } else {

        player.input.keys.brake = false;

    }

    if (player.controls.keys.nitro.isDown) {

        player.input.keys.nitro = true;

    } else {

        player.input.keys.nitro = false;

    }

    if (player.controls.keys.zoom.isDown) {

        player.input.keys.zoom = true;

    } else {

        player.input.keys.zoom = false;

    }

}