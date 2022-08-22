export const startCountdown = (raceSession, scene) => {

    setTimeout(() => {

        raceSession.gameMessageText.setText('GET READY!');

        setTimeout(() => {

            raceSession.gameMessageText.setText('');

            setTimeout(() => {

                raceSession.gameMessageText.setText('3');

                setTimeout(() => {

                    raceSession.gameMessageText.setText('2');

                    setTimeout(() => {
                        raceSession.gameMessageText.setText('1');

                        setTimeout(() => {

                            raceSession.gameMessageText.setText('GO!');
                            raceSession.gameOn = true;
                            raceSession.timer.startTime = scene.scene.time.now;

                            raceSession.players.forEach(player => {

                                player.timer.lapTimer.startTime = scene.scene.time.now;

                            });

                            setTimeout(() => {

                                raceSession.gameMessageText.setText('');


                            }, 1200);

                        }, 1000);

                    }, 1000);

                }, 1000);

            }, 1000)

        }, 2000);

    }, 1000)

}