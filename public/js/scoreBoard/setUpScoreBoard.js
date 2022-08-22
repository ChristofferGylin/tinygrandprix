export const setUpScoreBoard = (game) => {

    const fontSizeHeadLine = 46;
    const fontSizeTitles = 26;
    const fontSizePlayerText = 20;
    const middleOfScreen = { x: 1280 / 2, y: 720 / 2 };
    const scoreBoardSize = { width: 1224, height: 576 };

    const scoreBoard = {

        rect: game.add.rectangle(middleOfScreen.x, middleOfScreen.y, scoreBoardSize.width, scoreBoardSize.height, 'black').setAlpha(0.8).setOrigin(0.5),
        layoutLines: [
            game.add.line(0, 0, middleOfScreen.x, middleOfScreen.y - (scoreBoardSize.height / 2) + 110, middleOfScreen.x + scoreBoardSize.width - 20, middleOfScreen.y - (scoreBoardSize.height / 2) + 110, 0xFFFFFF),
            game.add.line(0, 0, middleOfScreen.x, middleOfScreen.y - (scoreBoardSize.height / 2) + 110, middleOfScreen.x + scoreBoardSize.width - 20, middleOfScreen.y - (scoreBoardSize.height / 2) + 110, 0xFFFFFF),

        ],
        titleTexts: [
            game.add.text(middleOfScreen.x, middleOfScreen.y - (scoreBoardSize.height / 2) + 40, 'RESULTS', { fontFamily: 'Monospace', fontSize: fontSizeHeadLine, color: 'white' }).setOrigin(0.5),
            game.add.text(middleOfScreen.x - scoreBoardSize.width / 2 + 40, middleOfScreen.y - (scoreBoardSize.height / 2) + 80, 'DRIVER', { fontFamily: 'Monospace', fontSize: fontSizeTitles, color: 'white' }),
            game.add.text(middleOfScreen.x - scoreBoardSize.width / 2 + 213, middleOfScreen.y - (scoreBoardSize.height / 2) + 80, 'CAR', { fontFamily: 'Monospace', fontSize: fontSizeTitles, color: 'white' }),
            game.add.text(middleOfScreen.x + scoreBoardSize.width / 2 - 155, middleOfScreen.y - (scoreBoardSize.height / 2) + 80, 'TOTAL TIME', { fontFamily: 'Monospace', fontSize: fontSizeTitles, color: 'white' }),
        ],
        players: [

        ]

    }
    scoreBoard.titleTexts.push()

    let xValue = middleOfScreen.x - scoreBoardSize.width / 2 + 365;

    for (let i = 0; i < game.raceSession.track.numberOfLaps; i++) {

        let lapText = game.add.text(xValue, middleOfScreen.y - (scoreBoardSize.height / 2) + 80, `LAP ${i + 1}`, { fontFamily: 'Monospace', fontSize: fontSizeTitles, color: 'white' });
        scoreBoard.titleTexts.push(lapText);
        xValue += 114;

    }

    let yValue = middleOfScreen.y - (scoreBoardSize.height / 2) + 120;
    let lineYValue = middleOfScreen.y - (scoreBoardSize.height / 2) + 148

    for (let i = 0; i < game.raceSession.players.length; i++) {

        const player = {

            position: game.add.text(middleOfScreen.x - scoreBoardSize.width / 2 + 10, yValue, `${game.raceSession.players[i].position}.`, { fontFamily: 'Monospace', fontSize: fontSizePlayerText, color: 'white', fontWeight: 'bold' }),
            name: game.add.text(middleOfScreen.x - scoreBoardSize.width / 2 + 40, yValue, game.raceSession.players[i].name, { fontFamily: 'Monospace', fontSize: fontSizePlayerText, color: 'white', fontWeight: 'bold' }),
            carText: game.add.text(middleOfScreen.x - scoreBoardSize.width / 2 + 235, yValue, game.raceSession.players[i].car.name, { fontFamily: 'Monospace', fontSize: fontSizePlayerText, color: 'white' }),
            carIcon: game.add.sprite(middleOfScreen.x - scoreBoardSize.width / 2 + 223, yValue + 10, 'cars', game.raceSession.players[i].car.imgName).setScale(0.7).setAngle(-90),
            laps: [

            ],
            layoutLines: [
                game.add.line(0, 0, middleOfScreen.x, lineYValue, middleOfScreen.x + scoreBoardSize.width - 20, lineYValue, 0xFFFFFF),
                game.add.line(0, 0, middleOfScreen.x - scoreBoardSize.width / 2 + 35, yValue + 10, middleOfScreen.x - scoreBoardSize.width / 2 + 35, yValue + 47, 0xFFFFFF),
                game.add.line(0, 0, middleOfScreen.x - scoreBoardSize.width / 2 + 210, yValue + 10, middleOfScreen.x - scoreBoardSize.width / 2 + 210, yValue + 47, 0xFFFFFF),
                game.add.line(0, 0, middleOfScreen.x + scoreBoardSize.width / 2 - 160, yValue + 10, middleOfScreen.x + scoreBoardSize.width / 2 - 160, yValue + 47, 0xFFFFFF)
            ],
            lapLines: [],
            total: game.add.text(middleOfScreen.x + scoreBoardSize.width / 2 - 150, yValue, '', { fontFamily: 'Monospace', fontSize: fontSizePlayerText, color: 'white' })

        }

        xValue = middleOfScreen.x - scoreBoardSize.width / 2 + 365;

        for (let j = 0; j < game.raceSession.track.numberOfLaps; j++) {

            let lapText = game.add.text(xValue, yValue, ``, { fontFamily: 'Monospace', fontSize: fontSizePlayerText, color: 'white' });
            player.lapLines.push(game.add.line(0, 0, xValue - 8, yValue + 10, xValue - 8, yValue + 47, 0xFFFFFF))
            player.laps.push(lapText);
            xValue += 114;

            if (j === game.raceSession.track.numberOfLaps - 1) {

                if (game.raceSession.track.numberOfLaps !== 6) {

                    player.lapLines.push(game.add.line(0, 0, xValue - 5, yValue + 10, xValue - 5, yValue + 47, 0xFFFFFF));

                }
            }
        }

        yValue += 35;
        lineYValue += 35;

        scoreBoard.players.push(player)

    }

    game.raceSession.scoreBoard = scoreBoard

}