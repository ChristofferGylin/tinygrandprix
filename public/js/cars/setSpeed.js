import { scaleValue } from '../math/scaleValue.js';

const divisionFactor = 36;

export function setSpeed() {

    this.determineGear();
    this.determineRpm();

    // determine resistance from slow speed

    let resistance;

    if (this.speed * divisionFactor < 100) {

        resistance = scaleValue(this.speed * divisionFactor, [0, 100], [0.05, 1])

    } else {

        resistance = 1;
    }


    // determine slip




    // determine engine efficency 


    let efficency;
    if (this.engine.rpm > this.engine.optimalRpm) {

        const difference = this.engine.rpm - this.engine.optimalRpm;
        efficency = scaleValue(difference, [0, this.engine.maxRpm], [1, 0])

    }
    else if (this.engine.rpm < this.engine.optimalRpm) {

        const difference = this.engine.optimalRpm - this.engine.rpm;
        efficency = scaleValue(difference, [0, this.engine.maxRpm], [1, 0])

    } else {

        efficency = 1;

    }

    // determine acceleration and set speed

    let powerMultiplier = this.engine.horsepower;

    if (this.carObject.body.speed < (((this.topSpeed / divisionFactor) * this.throttle) * powerMultiplier) * resistance && this.carObject.body.speed < this.topSpeed / divisionFactor) {

        const difference = (((this.topSpeed / divisionFactor) * this.throttle) * powerMultiplier) - this.carObject.body.speed;
        //const accelerationMultiplier = scaleValue(difference, [this.carObject.body.speed, this.topSpeed / divisionFactor], [0.1, 0.2]);
        const acceleration = ((((this.throttle * this.engine.horsepower) * this.gearbox.gears[this.gearbox.currentGear].accelerationRatio) * this.gearbox.finalDrive) * efficency);


        // determine slip

        let accelerationToSpeedRatio = acceleration / (this.carObject.body.speed * divisionFactor);
        let angularVelocity = this.carObject.body.angularVelocity;

        if (angularVelocity < 0) {
            angularVelocity = -angularVelocity;
        }

        if (angularVelocity > 0) {

        }

        // if (angularVelocity > 0.015 && this.carObject.body.speed * divisionFactor > 150) {
        //     if (this.tireSound.state === "stopped") {

        //         this.tireSound.start();
        //     }

        // }

        this.speed += (acceleration * 0.055) * resistance;

    } else if (this.carObject.body.speed > (this.topSpeed / divisionFactor) * this.throttle && this.carObject.body.speed > 0) {

        const difference = this.carObject.body.speed - ((this.topSpeed / divisionFactor) * this.throttle);
        const deacceleration = scaleValue(difference, [0, this.carObject.body.speed], [0, 1]);
        this.speed -= 0.3 * deacceleration;

        if (this.speed < 0) {
            this.speed = 0;
            this.carObject.body.speed = 0;
        }

    }





    // set thrust

    const thrust = this.speed;


    this.carObject.thrust(thrust);

}