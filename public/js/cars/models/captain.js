export const captain = {
    name: 'The Captain',
    brakeFactor: 0.5,
    friction: 0.2,
    mass: 17240,
    topSpeed: 225,
    horsepower: 1.335,
    imgName: 'captain.png',
    shapeName: 'captain',
    gears: [
        { name: '1st', maxSpeed: 74, accelerationRatio: 2.65 },
        { name: '2nd', maxSpeed: 139, accelerationRatio: 1.93 },
        { name: '3rd', maxSpeed: 175, accelerationRatio: 1.39 },
        { name: '4th', maxSpeed: 225, accelerationRatio: 1 },
    ],
    finalDrive: 3.23,
    optimalRpm: 4000,
    maxRpm: 6500,
    tireGrip: 0.5,
}