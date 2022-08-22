export const adder = {
    name: 'Rudge Adder',
    brakeFactor: 0.5,
    friction: 0.2,
    mass: 14880,
    topSpeed: 264,
    horsepower: 1.400,
    imgName: 'adder.png',
    shapeName: 'adder',
    gears: [
        { name: '1st', maxSpeed: 44, accelerationRatio: 2.66 },
        { name: '2nd', maxSpeed: 63, accelerationRatio: 1.78 },
        { name: '3rd', maxSpeed: 90, accelerationRatio: 1.3 },
        { name: '4th', maxSpeed: 128, accelerationRatio: 1 },
        { name: '5th', maxSpeed: 184, accelerationRatio: 0.74 },
        { name: '6th', maxSpeed: 264, accelerationRatio: 0.5 },
    ],
    finalDrive: 3.07,
    optimalRpm: 3600,
    maxRpm: 6000,
    tireGrip: 0.6,
}


//this.engine.rpm = 7000 * (this.carObject.body.speed / this.gearbox.gears[this.gearbox.currentGear].maxSpeed);