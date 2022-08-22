export class Player {
    constructor(name, car, ai, playerNumber) {
        this.ai = ai;
        this.camera = null;
        this.car = car;
        this.cursors = null;
        this.carObject = null;
        this.gamePad = null;
        this.gamePadButtons = {

            throttle: false,
            brake: false,
            left: false,
            right: false,
            snapshot: false

        };
        this.hud = {

            lapTitle: null,
            lap: null,
            positionTitle: null,
            position: null,
            speedometerTitle: null,
            speedometer: null,
            timer: null,
            timerTitle: null,
            lapTimer: null,
            lapTimerTitle: null,
            bestLap: null,
            bestLapTitle: null,
            newBestLap: null,
            personalMessage1: null,
            personalMessage2: null

        };
        this.controls = {

            keys: null,
            gamepad: null,

        }
        this.lapTimes = [];
        this.lap = 0;
        this.timer = {
            lapTimer: {
                startTime: null,
                parts: [],
                textValue: `00.00:00`,
                laps: [],
            },
            totalTime: null
        };
        this.name = name;
        this.nextCheckpoint = 0;
        this.distanceToCheckpoint = 0;
        this.otherCars = null;
        this.playerNumber = playerNumber;
        this.position = playerNumber + 1;
        this.raceFinished = false;

    }
}