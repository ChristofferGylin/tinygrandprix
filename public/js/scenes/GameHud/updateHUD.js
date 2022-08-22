export const updateHUD = (game) => {

    game.raceSession.players.forEach(player => {

        if (!player.ai) {


            player.hud.position.setText(`Pos:${player.position} of ${game.raceSession.players.length}`);

            let speedValue = Math.round(player.car.carObject.body.speed * 36);
            let pixelSpeedValue = Math.round(player.car.carObject.body.speed);
            let speedText = ``;


            if (speedValue < 10) {
                speedText = `00${speedValue}`;
            } else if (speedValue < 100) {
                speedText = `0${speedValue}`;
            } else {
                speedText = `${speedValue}`;
            }
            player.hud.speedometer.setText(speedText);
            player.hud.pixelmeter.setText(pixelSpeedValue);

            let gearText = `${player.car.gearbox.currentGear + 1}`;

            switch (player.car.gearbox.currentGear + 1) {

                case 1:
                    gearText += `st`;
                    break;

                case 2:
                    gearText += `nd`;
                    break;

                case 3:
                    gearText += `rd`;
                    break;

                default:
                    gearText += `th`;

            }

            player.hud.gear.setText(gearText);

            player.hud.rpmMeter.setText(Math.round(player.car.engine.rpm))

            if (game.raceSession.gameOn) {
                player.hud.timer.setText(game.raceSession.timer.textValue);
                player.hud.lapTimer.setText(player.timer.lapTimer.textValue);
            }


        }
    });

}