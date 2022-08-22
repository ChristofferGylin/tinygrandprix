export const pauseTimers = (raceSession, scene) => {

    let timePassed = scene.scene.time.now - raceSession.timer.startTime;
    raceSession.timer.parts.push(timePassed);

    raceSession.players.forEach(player => {

        let timePassedLap = scene.scene.time.now - player.timer.lapTimer.startTime;
        player.timer.lapTimer.parts.push(timePassedLap);
    });

}