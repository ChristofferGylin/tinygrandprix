export const hideScoreBoard = (raceSession) => {

    raceSession.scoreBoard.rect.visible = false;

    raceSession.scoreBoard.titleTexts.forEach(title => {
        title.visible = false;
    });

    raceSession.scoreBoard.layoutLines.forEach(element => {
        element.visible = false;
    });

    raceSession.scoreBoard.players.forEach(player => {

        player.position.visible = false;
        player.name.visible = false;
        player.carText.visible = false;
        player.carIcon.visible = false;
        player.total.visible = false;

        player.laps.forEach(lap => {
            lap.visible = false;
        });

        player.lapLines.forEach(line => {
            line.visible = false;
        });

        player.layoutLines.forEach(line => {
            line.visible = false;
        });
    });

}