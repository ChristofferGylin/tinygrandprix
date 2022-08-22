const divisionFactor = 36;

export function determineGear() {

    let tempGear = 0;

    for (let i = this.gearbox.gears.length - 2; i >= 0; i--) {

        if (this.carObject.body.speed > this.gearbox.gears[i].maxSpeed / divisionFactor) {

            tempGear = i + 1;
            break;

        }
    }

    if (this.carObject.body.speed < ((this.gearbox.gears[tempGear].maxSpeed / divisionFactor) * 1.1) * this.throttle) {

        this.gearbox.currentGear = tempGear;


    }

}