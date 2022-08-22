import { checkBestLap } from './checkBestLap.js';
import { finishRace } from "./finishRace.js";
import { newLap } from "../GameHud/timer/newLap.js";
import { setBestTime } from '../GameHud/timer/setBestTime.js';
export const handleCollisions = (raceSession, game) => {

    game.matter.world.on('collisionstart', (e) => {

        let pairs = e.pairs;

        // Checkpoints

        for (let i = 0; i < pairs.length; i++) {

            let bodyA = pairs[i].bodyA;
            let bodyB = pairs[i].bodyB;

            if (pairs[i].isSensor) {
                let playerBody;
                let checkpointBody;

                if (bodyA.label === 'checkpoint') {
                    checkpointBody = bodyA;
                    playerBody = bodyB;
                } else if (bodyB.label === 'checkpoint') {
                    checkpointBody = bodyB
                    playerBody = bodyA;
                } else {
                    continue;
                }

                if (playerBody.gameObject) {

                    if (playerBody.gameObject.label === 'car') {

                        if (raceSession.players[playerBody.gameObject.playerNumber].nextCheckpoint === checkpointBody.checkpointNumber) {

                            if (checkpointBody.checkpointNumber === 0) {

                                if (!raceSession.players[playerBody.gameObject.playerNumber].raceFinished) {

                                    if (raceSession.players[playerBody.gameObject.playerNumber].lap !== 0) {

                                        newLap(raceSession.players[playerBody.gameObject.playerNumber], game);

                                    }

                                    raceSession.players[playerBody.gameObject.playerNumber].lap++;

                                    if (!raceSession.players[playerBody.gameObject.playerNumber].ai) {

                                        if (checkBestLap(raceSession.players[playerBody.gameObject.playerNumber])) {

                                            setBestTime(raceSession.players[playerBody.gameObject.playerNumber], game);

                                        }

                                        let maxLaps;

                                        if (game.gameConfig.hotlap) {

                                            maxLaps = '∞';

                                        } else {

                                            maxLaps = game.raceSession.track.numberOfLaps;

                                        }

                                        raceSession.players[playerBody.gameObject.playerNumber].hud.lap.setText(`Lap:${raceSession.players[playerBody.gameObject.playerNumber].lap} of ${maxLaps}`);

                                    }



                                    if (raceSession.players[playerBody.gameObject.playerNumber].lap > raceSession.track.numberOfLaps) {
                                        finishRace(raceSession.players[playerBody.gameObject.playerNumber], game)
                                    }
                                }

                            }

                            raceSession.players[playerBody.gameObject.playerNumber].nextCheckpoint++;

                            if (raceSession.players[playerBody.gameObject.playerNumber].nextCheckpoint > raceSession.track.numberOfCheckpoints) {
                                raceSession.players[playerBody.gameObject.playerNumber].nextCheckpoint = 0;
                            }
                        }

                    }

                }
            }
        }
    })
}