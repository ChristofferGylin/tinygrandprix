import { determinePositions } from './determinePositions.js';
import { raycast } from './raycast.js';
import { setUpCar } from './setUpCar.js';
import { createNewSession } from './createNewSession.js';
import { handleCollisions } from './handleCollisions.js';
import { setUpCameras } from './setUpCameras.js';
import { scaleValue } from '../../math/scaleValue.js';
import { timer } from '../GameHud/timer/timer.js';
import { setLapTimer } from '../GameHud/timer/setLapTimer.js';
import { allTracks } from '../../tracks/allTracks.js';
import { setUpMap } from './setUpMap.js';
import { setSidewayMovement } from '../../cars/setSidewayMovement.js';


export class GameScene extends Phaser.Scene {

    constructor() {
        super('GameScene');
    }

    init(gameConfig) {

        this.gameConfig = gameConfig;
        this.gameSettings = gameConfig.gameSettings;
        this.inputControl = gameConfig.inputControl;
        this.raceSession = createNewSession(gameConfig.players, gameConfig.track, 6);

        console.log('this.gameConfig from GameScene')
        console.log(this.gameConfig)

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

        this.scene.launch('GameHud', this);
        this.inputControl.isInMenu = false;
        this.raceSession.isgameSceneReady = true;

        let graphics = this.add.graphics({ lineStyle: { width: 2, color: 0xaa00aa } });
        console.log('this from gamescene')
        console.log(this)
        console.log('this.raceSession from gamescene')
        console.log(this.raceSession)
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

    update(time, delta) {


        // Timer total time

        timer(this.raceSession, this.scene);

        for (let i = 0; i < this.raceSession.players.length; i++) {

            let turnPercent = 0;
            const car = this.raceSession.players[i].car.carObject;

            if (!this.raceSession.gameOn) {
                this.raceSession.players[i].car.speed = 0;
                car.body.speed = 0;
                return
            }

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

                setLapTimer(this.raceSession.players[i], this)
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