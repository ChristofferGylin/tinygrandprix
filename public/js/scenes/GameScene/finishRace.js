import { refreshScoreBoard } from "../../scoreBoard/refreshScoreBoard.js";
import { showScoreBoard } from "../../scoreBoard/showScoreBoard.js";

export const finishRace = (player, game) => {

    let totalTime = game.scene.scene.time.now - game.raceSession.timer.startTime;

    game.raceSession.timer.parts.forEach(partTime => {
        totalTime += partTime;
    });

    player.timer.totalTime = Math.round(totalTime);
    player.raceFinished = true;
    game.raceSession.results.push(player);

    if (!player.ai) {
        let message;
        let message2 = ``;

        if (player.position === 1) {

            message = `${player.position}st Place`;
            message2 = `Congratulations!`;


        } else if (player.position === 2) {

            message = `${player.position}nd Place`;

        } else if (player.position === 3) {

            message = `${player.position}rd Place`;

        } else if (player.position === 4) {

            message = `${player.position}th Place`;

        } else {

            message = `${player.position}th Place`;
            message2 = `Better luck next time!`;

        }

        setTimeout(() => {

            player.hud.personalMessage1.setText(message);
            player.hud.personalMessage2.setText(message2);

            setTimeout(() => {

                player.hud.personalMessage1.setText('');
                player.hud.personalMessage2.setText('');

            }, 2500)

        }, 1000)

        let allHumansFinished = true;

        game.raceSession.players.forEach(player => {

            if (!player.ai && !player.raceFinished) {

                allHumansFinished = false;
                return;
            }

        });

        if (allHumansFinished) {

            setTimeout(() => {

                showScoreBoard(game.raceSession);
                refreshScoreBoard(game.raceSession);

            }, 4500, game.raceSession)

        }

        game.cameras.main.stopFollow()

    } else {

        if (game.raceSession.scoreBoard.rect.visible === true) {

            refreshScoreBoard(game.raceSession);

        }
    }
}