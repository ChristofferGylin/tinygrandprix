export const unPauseTimers = (raceSession, scene) => {

    raceSession.timer.startTime = scene.scene.time.now;

    raceSession.players.forEach(player => {
        player.timer.lapTimer.startTime = scene.scene.time.now;
    });


}