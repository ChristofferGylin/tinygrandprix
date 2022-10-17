import { determineGear } from "./determineGear.js";
import { determineRpm } from "./determineRpm.js";
import { EngineSynth } from "./EngineSynth.js";
import { setEngineSound } from "./setEngineSound.js";
import { setSpeed } from "./setSpeed.js";
import { setBrake } from "./setBrake.js";
import { setSidewayMovement } from "./setSidewayMovement.js";

export class Car {

    constructor(model) {

        this.brakeFactor = model.brakeFactor;
        this.carObject = null;
        this.name = model.name;
        this.friction = model.friction;
        this.mass = model.mass;
        this.topSpeed = model.topSpeed;
        this.speed = 0;
        this.tireGrip = model.tireGrip
        this.imgName = model.imgName;
        this.shapeName = model.shapeName;
        this.gearbox = {

            currentGear: 0,
            gears: model.gears,
            finalDrive: model.finalDrive

        };
        this.engine = {

            horsepower: model.horsepower,
            maxSpeed: model.topSpeed,
            rpm: 1000,
            optimalRpm: model.optimalRpm,
            maxRpm: model.maxRpm,
            synth: new EngineSynth(),

        };
        //this.tireSound = new Tone.Player('/assets/sounds/TireScreech.wav').toDestination();
        this.slip = 0;
        this.throttle = 0;
        this.brake = 0;
        this.setEngineSound = setEngineSound;
        this.determineGear = determineGear;
        this.determineRpm = determineRpm;
        this.setSpeed = setSpeed;
        this.setBrake = setBrake;
        this.setSidewayMovement = setSidewayMovement;

    }
}