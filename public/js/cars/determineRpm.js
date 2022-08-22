const divisionFactor = 36;

export function determineRpm() {

    if (this.engine.maxRpm * ((this.carObject.body.speed * divisionFactor) / this.gearbox.gears[this.gearbox.currentGear].maxSpeed) < 1000) {
        this.engine.rpm = 1000;
    } else {

        this.engine.rpm = this.engine.maxRpm * ((this.carObject.body.speed * divisionFactor) / this.gearbox.gears[this.gearbox.currentGear].maxSpeed);

    }

}