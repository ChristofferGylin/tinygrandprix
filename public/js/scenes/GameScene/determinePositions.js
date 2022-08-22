export const determinePositions = (raceSession) => {

    let positions = [];

    raceSession.players.forEach(player => {



        if (positions.length === 0) {

            positions.push(player);

        } else {


            for (let i = 0; i < positions.length; i++) {

                if (player.raceFinished && !positions[i].raceFinished) {

                    positions.splice(i, 0, player);
                    return;

                } else if (player.raceFinished && positions[i].raceFinished) {

                    if (player.position < positions[i].position) {

                        positions.splice(i, 0, player);
                        return;

                    }

                } else {

                    if (player.lap > positions[i].lap) {

                        positions.splice(i, 0, player);
                        return;

                    } else if (player.lap === positions[i].lap) {

                        let oldCheckpoint;
                        let newCheckpoint;

                        if (player.nextCheckpoint === 0) {

                            newCheckpoint = raceSession.track.numberOfCheckpoints + 1;

                        } else {

                            newCheckpoint = player.nextCheckpoint;

                        }

                        if (positions[i].nextCheckpoint === 0) {

                            oldCheckpoint = raceSession.track.numberOfCheckpoints + 1;

                        } else {

                            oldCheckpoint = positions[i].nextCheckpoint;

                        }

                        if (newCheckpoint > oldCheckpoint) {

                            positions.splice(i, 0, player);
                            return;

                        } else if (newCheckpoint === oldCheckpoint) {

                            if (player.distanceToCheckpoint < positions[i].distanceToCheckpoint) {

                                positions.splice(i, 0, player);
                                return;

                            }

                        }

                    };

                }


                if (i === positions.length - 1) {
                    positions.push(player);
                    return

                };
            };
        };
    });

    for (let i = 0; i < positions.length; i++) {
        positions[i].position = i + 1;
    }

};