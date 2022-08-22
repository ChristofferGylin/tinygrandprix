import { startCountdown } from "./startCountdown.js";

export const checkGameScene = (game) => {

    if (game.raceSession.isgameSceneReady) {

        startCountdown(game.raceSession, game.scene);

    } else {

        setTimeout(checkGameScene, 100, game);

    }
}