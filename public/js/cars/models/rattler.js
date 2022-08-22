export const rattler = {
    name: 'Karby Rattler',
    brakeFactor: 0.6,
    friction: 0.2,
    mass: 11740,
    topSpeed: 265,
    horsepower: 1.425,
    currentSpeed: 0,
    acceleration: 1.7,
    imgName: 'rattler.png',
    shapeName: 'rattler',
    gears: [
        { name: '1st', maxSpeed: 74, accelerationRatio: 2.32 },
        { name: '2nd', maxSpeed: 139, accelerationRatio: 1.69 },
        { name: '3rd', maxSpeed: 175, accelerationRatio: 1.29 },
        { name: '4th', maxSpeed: 232, accelerationRatio: 1 },
    ],
    finalDrive: 3.31,
    optimalRpm: 3500,
    maxRpm: 6500,
    tireGrip: 0.4
}