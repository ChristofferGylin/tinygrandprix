import { millisToTime } from "../scenes/GameHud/timer/millisToTime.js";

export const refreshScoreBoard = (raceSession) => {

    for (let i = 0; i < raceSession.results.length; i++) {

        raceSession.scoreBoard.players[i].position.setText(raceSession.results[i].position);
        raceSession.scoreBoard.players[i].name.setText(raceSession.results[i].name);
        raceSession.scoreBoard.players[i].carText.setText(raceSession.results[i].car.name);
        raceSession.scoreBoard.players[i].carIcon.setTexture('cars', raceSession.results[i].car.imgName);
        raceSession.scoreBoard.players[i].total.setText(millisToTime(raceSession.results[i].timer.totalTime, true));

        raceSession.scoreBoard.players[i].position.visible = true;
        raceSession.scoreBoard.players[i].name.visible = true;
        raceSession.scoreBoard.players[i].carText.visible = true;
        raceSession.scoreBoard.players[i].carIcon.visible = true;
        raceSession.scoreBoard.players[i].total.visible = true;

        for (let j = 0; j < raceSession.results[i].timer.lapTimer.laps.length; j++) {

            raceSession.scoreBoard.players[i].laps[j].setText(millisToTime(raceSession.results[i].timer.lapTimer.laps[j], true));
            raceSession.scoreBoard.players[i].laps[j].visible = true;

        }

        raceSession.scoreBoard.players[i].layoutLines.forEach(line => {
            line.visible = true;
        });
        raceSession.scoreBoard.players[i].lapLines.forEach(line => {
            line.visible = true;
        });

    }

}

