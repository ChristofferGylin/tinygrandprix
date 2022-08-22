
export const getPlayerPositions = (game, index) => {

    const gameWidth = game.game.config.width;
    const gameHeight = game.game.config.height;
    const margin = 10;

    let left;
    let right;
    let top;
    let bottom;
    let middle = { x: 0, y: 0 };
    let personalMessageY;

    let setFontSizes;

    switch (game.raceSession.numberOfHumans) {

        case 1:

            left = margin;
            right = gameWidth - margin;
            top = margin;
            bottom = gameHeight - margin;
            middle = { x: gameWidth / 2, y: gameHeight / 2 };
            personalMessageY = 120;

            setFontSizes = {

                speedometerTitle: 56,
                speedometer: 76,
                default: 40,

            }

            break;

        case 2:

            setFontSizes = {

                speedometerTitle: 38,
                speedometer: 51,
                default: 27,

            }

            if (game.raceSession.gameSettings.horizontalSplitscreen) {



                if (index % 2 === 0) {

                    top = margin;
                    bottom = (gameHeight / 2) - margin;
                    middle = { x: gameWidth / 2, y: gameHeight / 4 };

                } else {

                    top = (gameHeight / 2) + margin;
                    bottom = gameHeight - margin;
                    middle = { x: gameWidth / 2, y: (gameHeight / 4) * 3 };

                }

                left = margin;
                right = gameWidth - margin;




            } else {

                top = margin;
                bottom = gameHeight - margin;


                if (index % 2 === 0) {

                    left = margin;
                    right = (gameWidth / 2) - margin;
                    middle = { x: gameWidth / 4, y: gameHeight / 2 }

                } else {

                    left = (gameWidth / 2) + margin;
                    right = gameWidth - margin;
                    middle = { x: (gameWidth / 4) * 3, y: gameHeight / 2 }

                }



            }

            personalMessageY = middle.y - 60;

            break;

        default:

            setFontSizes = {

                speedometerTitle: 28,
                speedometer: 38,
                default: 20,

            }

            if (index % 2 === 0) {

                left = margin;
                right = (gameWidth / 2) - margin;
                middle.x = gameWidth / 4;



            } else {

                left = (gameWidth / 2) + margin;
                right = gameWidth - margin;
                middle.x = (gameWidth / 4 * 3);

            }

            if (index < 2) {

                top = margin;
                bottom = (gameHeight / 2) - margin;
                middle.y = gameHeight / 4;

            } else {

                top = (gameHeight / 2) + margin;
                bottom = gameHeight - margin;
                middle.y = (gameHeight / 4) * 3;

            }

            personalMessageY = middle.y - 50;

    }

    const timerWidth = 3;

    const positions = {

        position: { x: left, y: top, origin: { x: 0, y: 0 } },
        lap: { x: left, y: top + setFontSizes.default, origin: { x: 0, y: 0 } },
        timer: { x: right, y: top, origin: { x: 1, y: 0 } },
        timerTitle: { x: right - (timerWidth * setFontSizes.default), y: top, origin: { x: 1, y: 0 } },
        lapTimer: { x: right, y: top + setFontSizes.default, origin: { x: 1, y: 0 } },
        lapTimerTitle: { x: right - (timerWidth * setFontSizes.default), y: top + setFontSizes.default, origin: { x: 1, y: 0 } },
        bestLap: { x: right, y: top + setFontSizes.default * 2, origin: { x: 1, y: 0 } },
        bestLapTitle: { x: right - (timerWidth * setFontSizes.default), y: top + setFontSizes.default * 2, origin: { x: 1, y: 0 } },
        speedometer: { x: right, y: bottom - setFontSizes.speedometerTitle, origin: { x: 1, y: 1 } },
        pixelmeter: { x: right, y: bottom - (setFontSizes.speedometerTitle * 2), origin: { x: 1, y: 1 } },
        rpmMeter: { x: left, y: bottom - (setFontSizes.speedometerTitle * 2), origin: { x: 0, y: 1 } },

        speedometerTitle: { x: right, y: bottom, origin: { x: 1, y: 1 } },
        gear: { x: left, y: bottom - setFontSizes.speedometerTitle, origin: { x: 0, y: 1 } },
        gearTitle: { x: left, y: bottom, origin: { x: 0, y: 1 } },
        personalMessage1: { x: middle.x, y: personalMessageY, origin: { x: 0.5, y: 0.5 } },
        newBestLap: { x: middle.x, y: bottom - (setFontSizes.default * 2), origin: { x: 0.5, y: 0.5 } },
        personalMessage2: { x: middle.x, y: personalMessageY - (setFontSizes.default * 1.5), origin: { x: 0.5, y: 0.5 } },


        fontSize: setFontSizes

    }

    return positions;

}



