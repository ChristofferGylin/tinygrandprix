import { newLap } from "../GameHud/timer/newLap.js";
import { checkBestLap } from "../GameScene/checkBestLap.js";
import { setBestLap } from "./setBestLap.js";

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

                        const player = raceSession.players[0];

                        if (player.nextCheckpoint === checkpointBody.checkpointNumber) {

                            if (checkpointBody.checkpointNumber === 0) {

                                if (player.lap !== 0) {

                                    newLap(player, game);

                                    if (checkBestLap(player)) {

                                        setBestLap(game, raceSession);

                                    }

                                    game.ghost.alpha = 0.3;

                                } else {

                                    player.timer.lapTimer.startTime = game.scene.scene.time.now;


                                }

                                game.carPosition.length = 0;
                                game.currentFrame = 0;
                                player.lap++;

                                let maxLaps;

                                if (game.gameConfig.hotlap) {

                                    maxLaps = '∞';

                                } else {

                                    maxLaps = game.raceSession.track.numberOfLaps;

                                }

                                raceSession.players[playerBody.gameObject.playerNumber].hud.lap.setText(`Lap:${raceSession.players[playerBody.gameObject.playerNumber].lap} of ${maxLaps}`);


                            }

                            player.nextCheckpoint++;

                            if (player.nextCheckpoint > raceSession.track.numberOfCheckpoints) {
                                player.nextCheckpoint = 0;
                            }
                        }

                    }

                }
            }
        }
    })
}