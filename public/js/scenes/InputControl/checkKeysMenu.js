export const checkKeysMenu = (scene) => {

    if (scene.inputControl.menu.controls.keys.left.isDown || scene.inputControl.menu.controls.altKeys.left.isDown) {

        scene.inputControl.menu.input.keys.left = true;

    } else {

        scene.inputControl.menu.input.keys.left = false;

    }

    if (scene.inputControl.menu.controls.keys.right.isDown || scene.inputControl.menu.controls.altKeys.right.isDown) {

        scene.inputControl.menu.input.keys.right = true;

    } else {

        scene.inputControl.menu.input.keys.right = false;

    }

    if (scene.inputControl.menu.controls.keys.up.isDown || scene.inputControl.menu.controls.altKeys.up.isDown) {

        scene.inputControl.menu.input.keys.up = true;

    } else {

        scene.inputControl.menu.input.keys.up = false;

    }

    if (scene.inputControl.menu.controls.keys.down.isDown || scene.inputControl.menu.controls.altKeys.down.isDown) {

        scene.inputControl.menu.input.keys.down = true;

    } else {

        scene.inputControl.menu.input.keys.down = false;

    }

    if (scene.inputControl.menu.controls.keys.back.isDown || scene.inputControl.menu.controls.altKeys.back.isDown) {

        scene.inputControl.menu.input.keys.back = true;

    } else {

        scene.inputControl.menu.input.keys.back = false;

    }

    if (scene.inputControl.menu.controls.keys.select.isDown || scene.inputControl.menu.controls.altKeys.select.isDown) {

        scene.inputControl.menu.input.keys.select = true;

    } else {

        scene.inputControl.menu.input.keys.select = false;

    }

}