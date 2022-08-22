import { scaleValue } from '../math/scaleValue.js';

const divisionFactor = 36;



export function setBrake() {

    this.determineGear();
    this.determineRpm();

    let resistance;

    if (this.speed * divisionFactor > 100) {

        resistance = scaleValue(this.speed * divisionFactor, [0, 100], [0.05, 1])

    } else {

        resistance = 1;
    }




    // determine acceleration and set speed

    if (this.carObject.body.speed > 0) {



        this.speed -= this.brakeFactor * this.brake;

        if (this.speed < 0) {

            this.speed = 0;
            this.carObject.body.speed = 0;

        }

    } else {

        this.speed = 0;
        this.carObject.body.speed = 0;

    }

    // set thrust

    this.carObject.thrust(this.speed);

}