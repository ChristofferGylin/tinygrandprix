import { determinePositions } from '../determinePositions.js';
import { raycast } from '../raycast.js';
import { setUpCar } from '../setUpCar.js';
import { createNewSession } from '../createNewSession.js';
import { handleCollisions } from '../handleCollisions.js';
import { setUpCameras } from '../setUpCameras.js';
import { scaleValue } from '../math/scaleValue.js';
import { timer } from '../timer/timer.js';
import { allTracks } from '../tracks/allTracks.js';
import { setUpMap } from '../setUpMap.js';


export class GameScene extends Phaser.Scene {

    constructor() {
        super('GameScene');
    }

    init(gameConfig) {

        this.gameConfig = gameConfig;
        this.gameSettings = gameConfig.gameSettings;
        this.inputControl = gameConfig.inputControl;
        this.raceSession = createNewSession(gameConfig.players, gameConfig.track, 6);

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
        setUpCameras(this.raceSession, this);
        handleCollisions(this.raceSession, this);

        this.scene.launch('GameHud', this.raceSession);
        this.inputControl.isInMenu = false;
        this.raceSession.isgameSceneReady = true;

        let graphics = this.add.graphics({ lineStyle: { width: 2, color: 0xaa00aa } });
        console.log('this from gamescene')
        console.log(this)
        // const lineMinLength = 15;
        // const lineMaxLength = 30;
        // const numberOfLines = 3

        // for (let i = 0; i < 4; i++) {

        //     let endpoint = { x: 0, y: 0 };

        //     let lineLength = Math.round(lineMaxLength - ((lineMaxLength - lineMinLength) * (i / numberOfLines)));
        //     endpoint.x = (Math.cos(raceSession.players[0].carObject.body.angle + ((360 * (i / 16)) * (Math.PI / 180))) * lineLength) + raceSession.players[0].carObject.body.position.x;
        //     endpoint.y = (Math.sin(raceSession.players[0].carObject.body.angle + ((360 * (i / 16)) * (Math.PI / 180))) * lineLength) + raceSession.players[0].carObject.body.position.y;
        //     let line = new Phaser.Geom.Line(raceSession.players[0].carObject.body.position.x, raceSession.players[0].carObject.body.position.y, endpoint.x, endpoint.y);
        //     graphics.strokeLineShape(line);

        // }

        // for (let i = 1; i < 4; i++) {

        //     let endpoint = { x: 0, y: 0 };
        //     let lineLength = Math.round(lineMaxLength - ((lineMaxLength - lineMinLength) * (i / numberOfLines)));
        //     endpoint.x = (Math.cos(raceSession.players[0].carObject.body.angle - ((360 * (i / 16)) * (Math.PI / 180))) * lineLength) + raceSession.players[0].carObject.body.position.x;
        //     endpoint.y = (Math.sin(raceSession.players[0].carObject.body.angle - ((360 * (i / 16)) * (Math.PI / 180))) * lineLength) + raceSession.players[0].carObject.body.position.y;
        //     let line = new Phaser.Geom.Line(raceSession.players[0].carObject.body.position.x, raceSession.players[0].carObject.body.position.y, endpoint.x, endpoint.y);
        //     graphics.strokeLineShape(line);

        // }
    }

    update() {

        timer(this.raceSession, this.scene);

        for (let i = 0; i < this.raceSession.players.length; i++) {

            let turnPercent = 0;
            const car = this.raceSession.players[i].carObject;
            car.body.angularVelocity = 0;

            if (!this.raceSession.gameOn) {
                this.raceSession.players[i].car.currentSpeed = 0;
                car.body.speed = 0;
                return
            }

            if (this.raceSession.players[i].ai) {

                turnPercent = raycast(this.raceSession.players[i], this.raceSession.track.aiCheckPointsArray, this);

                if (car.body.speed < this.raceSession.players[i].car.topSpeed / 10 && this.raceSession.players[i].car.currentSpeed < this.raceSession.players[i].car.topSpeed) {
                    this.raceSession.players[i].car.currentSpeed += this.raceSession.players[i].car.acceleration;
                } else {
                    car.body.speed = this.raceSession.players[i].car.topSpeed / 10;
                }

            } else if (this.raceSession.players[i].raceFinished) {

                turnPercent = raycast(this.raceSession.players[i], this.raceSession.track.aiCheckPointsArray, this);

                if (car.body.speed < this.raceSession.players[i].car.topSpeed / 10 && this.raceSession.players[i].car.currentSpeed < this.raceSession.players[i].car.topSpeed) {
                    this.raceSession.players[i].car.currentSpeed += this.raceSession.players[i].car.acceleration;
                } else {
                    car.body.speed = this.raceSession.players[i].car.topSpeed / 10;
                }

                if (this.raceSession.raceOver) {

                    if (this.inputControl.players[i].input.sum.throttle) {

                        this.scene.stop('GameHud');
                        this.scene.restart('GameScene');

                    }

                }

            } else {

                raycast(this.raceSession.players[i], this.raceSession.track.aiCheckPointsArray, this);

                if (this.inputControl.players[i].input.sum.left) {

                    if (car.body.speed > 0) {
                        turnPercent = -1;
                    }

                } else if (this.inputControl.players[i].input.sum.right) {

                    if (car.body.speed > 0) {
                        turnPercent = 1;
                    }

                } else {

                    if (turnPercent < 0) {
                        turnPercent += 0.04;
                    } else if (turnPercent > 0) {
                        turnPercent -= 0.04;
                    }

                }

                if (this.inputControl.players[i].input.sum.throttle) {

                    if (this.raceSession.raceOver) {

                        this.scene.start('GameScene', this.gameConfig);

                    } else if (car.body.speed < this.raceSession.players[i].car.topSpeed / 10 && this.raceSession.players[i].car.currentSpeed < this.raceSession.players[i].car.topSpeed) {
                        this.raceSession.players[i].car.currentSpeed += this.raceSession.players[i].car.acceleration;
                    } else {
                        car.body.speed = this.raceSession.players[i].car.topSpeed / 10;
                    }

                } else if (this.inputControl.players[i].input.sum.reverse) {

                    if (this.raceSession.players[i].car.currentSpeed < 0) {

                        if (car.body.speed < (this.raceSession.players[i].car.topSpeed / 10) / 2) {
                            this.raceSession.players[i].car.currentSpeed--;
                        } else {
                            car.body.speed = (this.raceSession.players[i].car.topSpeed / 2) / 10
                        }

                    } else {
                        this.raceSession.players[i].car.currentSpeed -= 5;
                    }

                } else if (this.inputControl.players[i].input.sum.brake) {

                    if (this.raceSession.players[i].car.currentSpeed > 0) {

                        this.raceSession.players[i].car.currentSpeed -= 5;

                    } else {

                        this.raceSession.players[i].car.currentSpeed = 0;

                        if (car.body.speed < 0) {

                        }
                        car.body.speed = 0;

                    }

                } else {

                    if (car.body.speed < 0.001) {
                        car.body.speed = 0;
                    }

                    if (this.raceSession.players[i].car.currentSpeed < 0) {

                        this.raceSession.players[i].car.currentSpeed++;

                    } else if (this.raceSession.players[i].car.currentSpeed > 0) {

                        this.raceSession.players[i].car.currentSpeed--;
                        if (this.raceSession.players[i].car.currentSpeed < 0) {
                            this.raceSession.players[i].car.currentSpeed = 0;

                            if (car.body.speed < 0) {

                            }
                            car.body.speed = 0;
                        }
                    }
                }
            }

            car.thrust(this.raceSession.players[i].car.currentSpeed);
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

            if (this.raceSession.players[i].car.currentSpeed > 0) {
                car.setAngularVelocity(turnSpeed);
            } else {
                car.setAngularVelocity(-turnSpeed);
            }

            if (!this.raceSession.players[i].ai && !this.raceSession.players[i].raceFinished) {
                this.raceSession.players[i].camera.rotation = -(Phaser.Math.DegToRad(car.angle + 90));
            }

        }

        determinePositions(this.raceSession);

    }
}