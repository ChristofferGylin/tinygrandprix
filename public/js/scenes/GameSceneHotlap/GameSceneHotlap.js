import { determinePositions } from '../GameScene/determinePositions.js';
import { raycast } from '../GameScene/raycast.js';
import { setUpCar } from '../GameScene/setUpCar.js';
import { setUpGhostCar } from './setUpGhostCar.js';
import { createNewSession } from '../GameScene/createNewSession.js';
import { handleCollisions } from './handleCollisions.js';
import { setUpCameras } from '../GameScene/setUpCameras.js';
import { scaleValue } from '../../math/scaleValue.js';
import { timer } from '../GameHud/timer/timer.js';
import { allTracks } from '../../tracks/allTracks.js';
import { setUpMap } from '../GameScene/setUpMap.js';
import { setLapTimer } from '../GameHud/timer/setLapTimer.js';


export class GameSceneHotLap extends Phaser.Scene {

    constructor() {
        super('GameSceneHotlap');
    }

    init(gameConfig) {

        this.gameConfig = gameConfig;
        this.gameSettings = gameConfig.gameSettings;
        this.inputControl = gameConfig.inputControl;
        this.raceSession = createNewSession(gameConfig.players, gameConfig.track, 1);

    }

    preload() {

        if (allTracks[this.gameConfig.track].tilemap === null || allTracks[this.gameConfig.track].tilemap === undefined) {

            let trackName = ``;

            if (this.gameConfig.track < 10) {

                trackName = `track0${this.gameConfig.track}`;

            } else {

                trackName = `track${this.gameConfig.track}`;

            }

            this.load.tilemapTiledJSON(trackName, allTracks[this.gameConfig.track].tilemapPath);
        }
    }

    create() {

        this.matter.world.disableGravity();
        const carPhysics = this.cache.json.get('carPhysics');

        //setUpControls(this);
        setUpMap(this);
        setUpCar(this.raceSession, carPhysics, this);
        setUpGhostCar(this.raceSession, carPhysics, this);
        setUpCameras(this.raceSession, this);
        handleCollisions(this.raceSession, this);

        this.scene.launch('GameHud', this);
        this.inputControl.isInMenu = false;
        this.raceSession.isgameSceneReady = true;
        this.bestLapTime = { time: undefined, carPosition: [] };
        this.currentFrame = 0;
        this.carPosition = [];

    }

    update() {

        timer(this.raceSession, this.scene);
        setLapTimer(this.raceSession.players[0], this)

        for (let i = 0; i < this.raceSession.players.length; i++) {

            let turnPercent = 0;
            const car = this.raceSession.players[i].car.carObject;

            if (!this.raceSession.gameOn) {
                this.raceSession.players[i].car.speed = 0;
                car.body.speed = 0;
                return
            }
            if (this.raceSession.players[i].lap > 0) {

                if (this.currentFrame < this.bestLapTime.carPosition.length) {

                    this.ghost.setPosition(this.bestLapTime.carPosition[this.currentFrame].x, this.bestLapTime.carPosition[this.currentFrame].y);
                    this.ghost.setAngle(this.bestLapTime.carPosition[this.currentFrame].angle);

                } else {

                    this.ghost.alpha = 0;

                }



            }
            const position = { x: car.x, y: car.y, angle: car.angle }

            this.carPosition.push(position);
            this.currentFrame++;

            if (this.raceSession.players[i].ai) {

                turnPercent = raycast(this.raceSession.players[i], this.raceSession.track.aiCheckPointsArray, this);
                this.raceSession.players[i].car.throttle = 1;
                this.raceSession.players[i].car.setSpeed();


            } else if (this.raceSession.players[i].raceFinished) {

                turnPercent = raycast(this.raceSession.players[i], this.raceSession.track.aiCheckPointsArray, this);
                this.raceSession.players[i].car.throttle = 1;
                this.raceSession.players[i].car.setSpeed();
                this.raceSession.players[i].car.setEngineSound();

                if (this.raceSession.raceOver) {

                    if (this.inputControl.players[i].input.sum.throttle) {

                        this.scene.stop('GameHud');
                        this.scene.restart('GameScene');

                    }

                }

            } else {

                raycast(this.raceSession.players[i], this.raceSession.track.aiCheckPointsArray, this);

                if (this.inputControl.players[i].input.sum.direction !== 0) {

                    if (car.body.speed > 0) {
                        turnPercent = this.inputControl.players[i].input.sum.direction;
                    }

                } else {

                    if (turnPercent < 0) {
                        turnPercent += 0.04;
                    } else if (turnPercent > 0) {
                        turnPercent -= 0.04;
                    }

                }

                if (this.inputControl.players[i].input.sum.brake > 0) {

                    this.raceSession.players[i].car.brake = this.inputControl.players[i].input.sum.brake;
                    this.raceSession.players[i].car.setBrake();
                    this.raceSession.players[i].car.setEngineSound();

                } else {

                    this.raceSession.players[i].car.throttle = this.inputControl.players[i].input.sum.throttle;
                    this.raceSession.players[i].car.setSpeed();
                    this.raceSession.players[i].car.setEngineSound();


                }

                // if (this.inputControl.players[i].input.sum.reverse) {

                //     this.raceSession.players[i].car.throttle = 0;
                //     this.raceSession.players[i].car.setSpeed();
                //     this.raceSession.players[i].car.setEngineSound();

                // } 

                // if (this.inputControl.players[i].input.sum.brake) {

                //     this.raceSession.players[i].car.throttle = 0;
                //     this.raceSession.players[i].car.setSpeed();
                //     this.raceSession.players[i].car.setEngineSound();

                // } else {

                //     this.raceSession.players[i].car.throttle = 0;
                //     this.raceSession.players[i].car.setSpeed();
                //     this.raceSession.players[i].car.setEngineSound();
                //     if (car.body.speed < 0.001) {
                //         car.body.speed = 0;
                //     }

                //     if (this.raceSession.players[i].car.speed < 0) {

                //         this.raceSession.players[i].car.speed++;

                //     } else if (this.raceSession.players[i].car.speed > 0) {

                //         this.raceSession.players[i].car.speed--;
                //         if (this.raceSession.players[i].car.speed < 0) {
                //             this.raceSession.players[i].car.speed = 0;

                //             if (car.body.speed < 0) {

                //             }
                //             car.body.speed = 0;
                //         }
                //     }
                // }
            }


            let speedMultiplier = scaleValue(car.body.speed, [0, 5], [15, 5])
            let turnSpeed = car.body.speed * (speedMultiplier * turnPercent) / 1000;

            if (turnSpeed < 0) {

                if (turnSpeed < -0.05) {
                    turnSpeed = -0.05
                }

            } else if (turnSpeed > 0) {

                if (turnSpeed > 0.05) {
                    turnSpeed = 0.05
                }
            }

            if (this.raceSession.players[i].car.speed > 0) {
                car.setAngularVelocity(turnSpeed);
            } else {
                car.setAngularVelocity(-turnSpeed);
            }

            this.raceSession.players[i].car.setSidewayMovement();


            if (!this.raceSession.players[i].ai && !this.raceSession.players[i].raceFinished) {
                this.raceSession.players[i].camera.rotation = -(Phaser.Math.DegToRad(car.angle + 90));
            }

        }

        determinePositions(this.raceSession);

    }
}