export const sumInputsMenu = (scene) => {

    scene.inputControl.menu.input.sum.up = false;
    scene.inputControl.menu.input.sum.down = false;
    scene.inputControl.menu.input.sum.left = false;
    scene.inputControl.menu.input.sum.right = false;
    scene.inputControl.menu.input.sum.back = false;
    scene.inputControl.menu.input.sum.select = false;

    for (let i = 0; i < scene.inputControl.players.length; i++) {

        if (scene.inputControl.players[i].inputMenu.gamePad.up) {

            scene.inputControl.menu.input.sum.up = true;

        } else if (scene.inputControl.players[i].inputMenu.gamePad.down) {

            scene.inputControl.menu.input.sum.down = true;

        }

        if (scene.inputControl.players[i].inputMenu.gamePad.left) {

            scene.inputControl.menu.input.sum.left = true;

        } else if (scene.inputControl.players[i].inputMenu.gamePad.right) {

            scene.inputControl.menu.input.sum.right = true;

        }

        if (scene.inputControl.players[i].inputMenu.gamePad.back) {

            scene.inputControl.menu.input.sum.back = true;

        } else if (scene.inputControl.players[i].inputMenu.gamePad.select) {

            scene.inputControl.menu.input.sum.select = true;

        }
    }

    if (scene.inputControl.menu.input.keys.up) {

        scene.inputControl.menu.input.sum.up = true;

    } else if (scene.inputControl.menu.input.keys.down) {

        scene.inputControl.menu.input.sum.down = true;

    }

    if (scene.inputControl.menu.input.keys.left) {

        scene.inputControl.menu.input.sum.left = true;

    } else if (scene.inputControl.menu.input.keys.right) {

        scene.inputControl.menu.input.sum.right = true;

    }

    if (scene.inputControl.menu.input.keys.back) {

        scene.inputControl.menu.input.sum.back = true;

    } else if (scene.inputControl.menu.input.keys.select) {

        scene.inputControl.menu.input.sum.select = true;

    }


}