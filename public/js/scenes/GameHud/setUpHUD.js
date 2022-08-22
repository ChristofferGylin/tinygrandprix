import { getPlayerPositions } from "./positions/getPlayerPositions.js";

export const setUpHUD = (game) => {

    for (let i = 0; i < game.raceSession.players.length; i++) {

        if (!game.raceSession.players[i].ai) {


            let values;
            let horizontalLine;
            let verticalLine;
            switch (game.raceSession.numberOfHumans) {

                case 1:


                    break;

                case 2:

                    if (game.raceSession.gameSettings.horizontalSplitscreen) {

                        // Split Screen Lines

                        horizontalLine = game.add.line(0, 0, 0, game.game.config.height / 2, game.game.config.width * 2, game.game.config.height / 2, 0xFFFFFF);
                        horizontalLine.setLineWidth(2);
                        game.raceSession.hud.splitScreenLines.push(horizontalLine);

                    } else {

                        // Split Screen Lines

                        verticalLine = game.add.line(0, 0, game.game.config.width / 2, 0, game.game.config.width / 2, game.game.config.height * 2, 0xFFFFFF);
                        verticalLine.setLineWidth(2);
                        game.raceSession.hud.splitScreenLines.push(verticalLine);

                    }

                    break;

                default:

                    // Split Screen Lines

                    horizontalLine = game.add.line(0, 0, 0, game.game.config.height / 2, game.game.config.width * 2, game.game.config.height / 2, 0xFFFFFF);
                    horizontalLine.setLineWidth(2);
                    game.raceSession.hud.splitScreenLines.push(horizontalLine);
                    verticalLine = game.add.line(0, 0, game.game.config.width / 2, 0, game.game.config.width / 2, game.game.config.height * 2, 0xFFFFFF);
                    verticalLine.setLineWidth(2);
                    game.raceSession.hud.splitScreenLines.push(verticalLine);


            }

            values = getPlayerPositions(game, i);


            // Laps

            let maxLaps;

            console.log(game.gameConfig.hotlap)

            if (game.gameConfig.hotlap) {

                maxLaps = '∞';


            } else {

                maxLaps = game.raceSession.track.numberOfLaps;

            }

            game.raceSession.players[i].hud.lap = game.add.text(values.lap.x, values.lap.y, `Lap:${game.raceSession.players[i].lap} of ${maxLaps}`, { fontFamily: 'Monospace', fontSize: values.fontSize.default, color: 'white' }).setOrigin(values.lap.origin.x, values.lap.origin.y);;
            game.raceSession.players[i].hud.lap.setShadow(2, 2, 'black', 0, true);

            // Position

            game.raceSession.players[i].hud.position = game.add.text(values.position.x, values.position.y, `Pos:${game.raceSession.players[i].position} of ${game.raceSession.players.length}`, { fontFamily: 'Monospace', fontSize: values.fontSize.default, color: 'white' }).setOrigin(values.position.origin.x, values.position.origin.y);;
            game.raceSession.players[i].hud.position.setShadow(2, 2, 'black', 0, true);

            // Speedometer

            game.raceSession.players[i].hud.pixelmeter = game.add.text(values.pixelmeter.x, values.pixelmeter.y, '000', { fontFamily: 'Monospace', fontSize: values.fontSize.speedometer, color: 'white' }).setOrigin(values.speedometer.origin.x, values.speedometer.origin.y);
            game.raceSession.players[i].hud.pixelmeter.setShadow(2, 2, 'black', 0, true);
            game.raceSession.players[i].hud.speedometer = game.add.text(values.speedometer.x, values.speedometer.y, '000', { fontFamily: 'Monospace', fontSize: values.fontSize.speedometer, color: 'white' }).setOrigin(values.speedometer.origin.x, values.speedometer.origin.y);
            game.raceSession.players[i].hud.speedometer.setShadow(2, 2, 'black', 0, true);
            game.raceSession.players[i].hud.speedometerTitle = game.add.text(values.speedometerTitle.x, values.speedometerTitle.y, 'km/H', { fontFamily: 'Monospace', fontSize: values.fontSize.speedometerTitle, color: 'white' }).setOrigin(values.speedometerTitle.origin.x, values.speedometerTitle.origin.y);
            game.raceSession.players[i].hud.speedometerTitle.setShadow(2, 2, 'black', 0, true);

            // Gears

            game.raceSession.players[i].hud.gear = game.add.text(values.gear.x, values.gear.y, '000', { fontFamily: 'Monospace', fontSize: values.fontSize.speedometer, color: 'white' }).setOrigin(values.gear.origin.x, values.gear.origin.y);
            game.raceSession.players[i].hud.gear.setShadow(2, 2, 'black', 0, true);
            game.raceSession.players[i].hud.gearTitle = game.add.text(values.gearTitle.x, values.gearTitle.y, 'GEAR', { fontFamily: 'Monospace', fontSize: values.fontSize.speedometerTitle, color: 'white' }).setOrigin(values.gearTitle.origin.x, values.gearTitle.origin.y);
            game.raceSession.players[i].hud.gearTitle.setShadow(2, 2, 'black', 0, true);

            // RPM Meter

            game.raceSession.players[i].hud.rpmMeter = game.add.text(values.rpmMeter.x, values.rpmMeter.y, '0', { fontFamily: 'Monospace', fontSize: values.fontSize.speedometer, color: 'white' }).setOrigin(values.rpmMeter.origin.x, values.rpmMeter.origin.y);
            game.raceSession.players[i].hud.rpmMeter.setShadow(2, 2, 'black', 0, true);

            // Timer 

            game.raceSession.players[i].hud.timer = game.add.text(values.timer.x, values.timer.y, game.raceSession.timer.textValue, { fontFamily: 'Monospace', fontSize: values.fontSize.default, color: 'white' }).setOrigin(values.timer.origin.x, values.timer.origin.y);;
            game.raceSession.players[i].hud.timer.setShadow(2, 2, 'black', 0, true);
            const timerTitleCoords = game.raceSession.players[i].hud.timer.getLeftCenter();
            game.raceSession.players[i].hud.timerTitle = game.add.text(timerTitleCoords.x, values.timerTitle.y, 'TOTAL:', { fontFamily: 'Monospace', fontSize: values.fontSize.default, color: 'white' }).setOrigin(values.timerTitle.origin.x, values.timerTitle.origin.y);;
            game.raceSession.players[i].hud.timerTitle.setShadow(2, 2, 'black', 0, true);

            // Lap Timer

            game.raceSession.players[i].hud.lapTimer = game.add.text(values.lapTimer.x, values.lapTimer.y, game.raceSession.timer.textValue, { fontFamily: 'Monospace', fontSize: values.fontSize.default, color: 'white' }).setOrigin(values.lapTimer.origin.x, values.lapTimer.origin.y);;
            game.raceSession.players[i].hud.lapTimer.setShadow(2, 2, 'black', 0, true);
            const lapTimerTitleCoords = game.raceSession.players[i].hud.lapTimer.getLeftCenter();
            game.raceSession.players[i].hud.lapTimerTitle = game.add.text(lapTimerTitleCoords.x, values.lapTimerTitle.y, 'THIS LAP:', { fontFamily: 'Monospace', fontSize: values.fontSize.default, color: 'white' }).setOrigin(values.lapTimerTitle.origin.x, values.lapTimerTitle.origin.y);;
            game.raceSession.players[i].hud.lapTimerTitle.setShadow(2, 2, 'black', 0, true);

            // Best Lap 

            game.raceSession.players[i].hud.bestLap = game.add.text(values.bestLap.x, values.bestLap.y, game.raceSession.timer.textValue, { fontFamily: 'Monospace', fontSize: values.fontSize.default, color: 'orange' }).setOrigin(values.bestLap.origin.x, values.bestLap.origin.y);;
            game.raceSession.players[i].hud.bestLap.setShadow(2, 2, 'black', 0, true);
            const bestlapTitleCoords = game.raceSession.players[i].hud.lapTimer.getLeftCenter();
            game.raceSession.players[i].hud.bestLapTitle = game.add.text(bestlapTitleCoords.x, values.bestLapTitle.y, 'BEST LAP:', { fontFamily: 'Monospace', fontSize: values.fontSize.default, color: 'orange' }).setOrigin(values.bestLapTitle.origin.x, values.bestLapTitle.origin.y);;
            game.raceSession.players[i].hud.bestLapTitle.setShadow(2, 2, 'black', 0, true);


            // Personal Message

            game.raceSession.players[i].hud.personalMessage1 = game.add.text(values.personalMessage1.x, values.personalMessage1.y, ``, { fontFamily: 'Monospace', fontSize: values.fontSize.default, color: 'white' }).setOrigin(values.personalMessage1.origin.x, values.personalMessage1.origin.y);;
            game.raceSession.players[i].hud.personalMessage1.setShadow(2, 2, 'black', 0, true);
            game.raceSession.players[i].hud.personalMessage2 = game.add.text(values.personalMessage2.x, values.personalMessage2.y, ``, { fontFamily: 'Monospace', fontSize: values.fontSize.default, color: 'white' }).setOrigin(values.personalMessage2.origin.x, values.personalMessage2.origin.y);;
            game.raceSession.players[i].hud.personalMessage2.setShadow(2, 2, 'black', 0, true);

            // New Best Lap

            game.raceSession.players[i].hud.newBestLap = game.add.text(values.newBestLap.x, values.newBestLap.y, `NEW BEST LAP`, { fontFamily: 'Monospace', fontSize: values.fontSize.default, color: 'white' }).setOrigin(values.newBestLap.origin.x, values.newBestLap.origin.y);;
            game.raceSession.players[i].hud.newBestLap.setShadow(2, 2, 'black', 0, true);
            game.raceSession.players[i].hud.newBestLap.visible = false;

        }
    };
}