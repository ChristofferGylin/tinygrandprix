import { gameSettings } from "../gameSettings/gameSettings.js";

export class RaceSession {
    constructor(track, players, numberOfHumans) {

        this.gameOn = false;
        this.hud = {

            gameMessageText: null,
            splitScreenLines: []

        };
        this.players = players;
        this.timer = {
            startTime: null,
            parts: [],
            textValue: `00.00:00`
        };
        this.track = track;

        this.results = [];
        this.isgameSceneReady = false;
        this.raceOver = false;
        this.numberOfHumans = numberOfHumans;
        this.gameSettings = gameSettings;
    }
}