import { scaleValue } from "../math/scaleValue.js";

export function setSidewayMovement() {

    let right = false;
    const scaledSpeed = scaleValue(this.carObject.body.speed * 36, [0, 300], [0, 1]);
    let angularVelocity = this.carObject.body.angularVelocity;

    if (angularVelocity < 0) {

        right = true;
        angularVelocity = -angularVelocity;


    };

    const scaledAngularVelocity = scaleValue(angularVelocity, [0, 0.2], [0, 1])
    const multiplier = (scaledSpeed * scaledAngularVelocity) * 0.3;

    if (right) {

        this.carObject.thrustRight(multiplier * (this.carObject.body.speed * 36))

    } else {

        this.carObject.thrustLeft(multiplier * (this.carObject.body.speed * 36))

    }

}