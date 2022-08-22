export const checkBestLap = (player) => {

    if (player.timer.lapTimer.laps.length === 0) {

        return false;

    } else if (player.timer.lapTimer.laps.length === 1) {

        return true;

    } else {

        let isBestTime = true;

        for (let i = 0; i < player.timer.lapTimer.laps.length - 1; i++) {

            if (player.timer.lapTimer.laps[i] < player.timer.lapTimer.laps[player.timer.lapTimer.laps.length - 1]) {

                isBestTime = false;
                break;
            }

        }

        return isBestTime;
    }

}