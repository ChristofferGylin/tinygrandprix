export const sumInput = (player) => {

    player.input.sum.direction = player.input.gamePad.direction;
    player.input.sum.throttle = player.input.gamePad.throttle;
    player.input.sum.brake = player.input.gamePad.brake;

    if (player.input.keys.left) {

        player.input.sum.direction = -1;

    } else if (player.input.keys.right) {

        player.input.sum.direction = 1;
    }

    if (player.input.keys.throttle) {

        player.input.sum.throttle = 1;

    }

    if (player.input.keys.reverse || player.input.gamePad.reverse) {

        player.input.sum.reverse = true;

    } else {

        player.input.sum.reverse = false;

    }

    if (player.input.keys.brake) {

        player.input.sum.brake = 1;

    }

    if (player.input.keys.nitro || player.input.gamePad.nitro) {

        player.input.sum.nitro = true;

    } else {

        player.input.sum.nitro = false;

    }

    if (player.input.keys.zoom || player.input.gamePad.zoom) {

        player.input.sum.zoom = true;

    } else {

        player.input.sum.zoom = false;

    }

}