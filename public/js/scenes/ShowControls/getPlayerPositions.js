
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

    switch (game.gameConfig.numberOfPlayers) {

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

            if (game.gameSettings.horizontalSplitscreen) {



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

    const positions = {


        playerTitle: { x: middle.x, y: personalMessageY, origin: { x: 0.5, y: 0.5 } },
        throttle: { x: middle.x, y: personalMessageY + (setFontSizes.default * 2), origin: { x: 0, y: 0.5 } },
        brake: { x: middle.x, y: personalMessageY + (setFontSizes.default * 3), origin: { x: 0, y: 0.5 } },
        left: { x: middle.x, y: personalMessageY + (setFontSizes.default * 4), origin: { x: 0, y: 0.5 } },
        right: { x: middle.x, y: personalMessageY + (setFontSizes.default * 5), origin: { x: 0, y: 0.5 } },

        fontSize: setFontSizes

    }

    return positions;

}



