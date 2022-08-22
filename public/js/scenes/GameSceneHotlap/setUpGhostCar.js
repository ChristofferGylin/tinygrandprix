export const setUpGhostCar = (raceSession, ghostPhysics, game) => {

    let startPositionX = raceSession.track.startPosition.x;
    let startPositionY = raceSession.track.startPosition.y;

    for (let i = 0; i < raceSession.players.length; i++) {


        if (i % 2 === 0) {
            if (i !== 0) {
                startPositionX += 64;
            }
            startPositionY = 3472;
        } else {
            startPositionY = 3376;
        }
        //let ghost = game.matter.add.sprite(startPositionX, startPositionY, 'ghosts', raceSession.players[i].ghost.imgName, { shape: ghostPhysics[raceSession.players[i].ghost.shapeName] });
        let ghost = game.add.sprite(startPositionX, startPositionY, 'cars', raceSession.players[i].car.imgName);
        ghost.isSensor = true;
        ghost.setAngle(180);
        ghost.alpha = 0;

        ghost.label = `ghost`;

        game.ghost = ghost;


    }
}