export const loboretta = {
    name: 'Loboretta Contagione',
    brakeFactor: 1.5,
    friction: 0.2,
    mass: 14900,
    topSpeed: 300,
    horsepower: 1.375,
    imgName: 'loboretta.png',
    shapeName: 'loboretta',
    gears: [
        { name: '1st', maxSpeed: 105, accelerationRatio: 2.256 },
        { name: '2nd', maxSpeed: 134, accelerationRatio: 1.769 },
        { name: '3rd', maxSpeed: 177, accelerationRatio: 1.310 },
        { name: '4th', maxSpeed: 232, accelerationRatio: 0.990 },
        { name: '5th', maxSpeed: 300, accelerationRatio: 0.775 },
    ],
    finalDrive: 4.091,
    optimalRpm: 4500,
    maxRpm: 7500,
    tireGrip: 0.6
}