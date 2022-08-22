export const newLap = (player, game) => {

    let lapTime = game.scene.scene.time.now - player.timer.lapTimer.startTime;

    player.timer.lapTimer.parts.forEach(partTime => {
        lapTime += partTime;
    });

    lapTime = Math.round(lapTime);

    player.timer.lapTimer.laps.push(lapTime);

    player.timer.lapTimer.startTime = game.scene.scene.time.now;
    player.timer.lapTimer.parts.length = 0;

}