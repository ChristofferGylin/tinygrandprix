export const showScoreBoard = (raceSession) => {

    raceSession.scoreBoard.rect.visible = true;

    raceSession.scoreBoard.titleTexts.forEach(title => {
        title.visible = true;
    });

    raceSession.scoreBoard.layoutLines.forEach(line => {
        line.visible = true;
    });

    setTimeout(() => {
        raceSession.raceOver = true;
    }, 4000, raceSession)

}