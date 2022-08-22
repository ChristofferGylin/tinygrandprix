export const setUpCar = (raceSession, carPhysics, game) => {

    let startPositionX = raceSession.track.startPosition.x;
    let startPositionY = raceSession.track.startPosition.y;
    const allCars = [];

    for (let i = 0; i < raceSession.players.length; i++) {


        if (i % 2 === 0) {
            if (i !== 0) {
                startPositionX += 64;
            }
            startPositionY = 3472;
        } else {
            startPositionY = 3376;
        }
        let car = game.matter.add.sprite(startPositionX, startPositionY, 'cars', raceSession.players[i].car.imgName, { shape: carPhysics[raceSession.players[i].car.shapeName] });

        car.setAngle(180);

        car.setFriction(0.2, raceSession.players[i].car.friction, 0.3);
        car.setMass(raceSession.players[i].car.mass)
        car.body.useDamping = true;
        car.setBounce(0.5);
        car.nextCheckpoint = 0;
        car.body.label = `car`;
        car.label = `car`;

        car.body.parts.forEach(part => {
            part.label = `car`;
        });
        car.playerNumber = i;
        raceSession.players[i].car.carObject = car;

        if (!raceSession.players[i].ai) {

            raceSession.players[i].car.setEngineSound();
            raceSession.players[i].car.engine.synth.startSynth();
        }

        allCars.push(car);
    }

    for (let i = 0; i < raceSession.players.length; i++) {

        const otherCars = [];

        allCars.forEach(car => {

            if (car !== raceSession.players[i].car.carObject) {
                otherCars.push(car.body);
            }

        });

        raceSession.players[i].otherCars = otherCars;
    }
}