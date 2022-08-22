import { setBestTime } from "../GameHud/timer/setBestTime.js";

export const setBestLap = (game, raceSession) => {
    const player = raceSession.players[0]
    game.bestLapTime.time = player.timer.lapTimer.laps[player.timer.lapTimer.laps.length - 1];
    game.bestLapTime.carPosition.length = 0;
    for (let i = 0; i < game.carPosition.length; i++) {

        game.bestLapTime.carPosition.push(game.carPosition[i])
    }

    setBestTime(player, game);
    player.hud.newBestLap.visible = true;

    setTimeout(() => {

        player.hud.newBestLap.visible = false;

    }, 5000)

}