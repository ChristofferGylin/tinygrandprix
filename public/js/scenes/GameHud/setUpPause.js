import { pauseTimers } from "./timer/pauseTimers.js";
import { unPauseTimers } from "./timer/unPauseTimers.js";

export const setUpPause = (game) => {

    game.input.keyboard.on('keydown_ESC', function () {

        if (game.scene.isPaused('GameScene')) {
            game.scene.resume('GameScene');
            unPauseTimers(game.raceSession, game.scene);

        } else {
            game.scene.pause('GameScene');
            pauseTimers(game.raceSession, game.scene);
        }

    }, game)

}