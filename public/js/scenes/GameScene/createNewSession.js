import { botNames } from "../../gameSettings/botNames.js";
import { Car } from "../../cars/Car.js";
import { carsSet1 } from "../../cars/sets/carsSet1.js";
import { Player } from '../../classes/Player.js';
import { RaceSession } from '../../classes/RaceSession.js';
import { allTracks } from "../../tracks/allTracks.js";

export const createNewSession = (players, selectedTrack, numberOfCars) => {

    const numberOfHumans = players.length;

    const getRandomNumber = (max) => {

        return Math.floor(Math.random() * max);

    }
    let availibleNames = [];
    let availibleCars = [];

    botNames.forEach(bot => {
        availibleNames.push(bot);
    });

    for (let i = 0; i < carsSet1.length; i++) {

        let availible = true;

        for (let j = 0; j < players.length; j++) {

            if (players[j].car === i) {

                availible = false;

            }

        }

        if (availible) {
            availibleCars.push(carsSet1[i]);
        }

    }

    let drivers = [];

    for (let i = 0; i < players.length; i++) {
        const car = new Car(carsSet1[players[i].car])
        const newPlayer = new Player(players[i].name, car, false, i);
        drivers.push(newPlayer);
    }

    for (let i = drivers.length; i < numberOfCars; i++) {

        if (availibleCars.length === 0) {

            for (let j = 0; j < carsSet1.length; j++) {
                availibleCars.push(carsSet1[j])
            }

        }

        const carNumber = getRandomNumber(availibleCars.length);
        const botNameNumber = getRandomNumber(availibleNames.length);
        const car = new Car(availibleCars[carNumber])
        const newPlayer = new Player(availibleNames[botNameNumber], car, true, i);
        availibleNames.splice(botNameNumber, 1);
        availibleCars.splice(carNumber, 1);
        drivers.push(newPlayer);

    }

    const track = allTracks[selectedTrack];
    const session = new RaceSession(track, drivers, numberOfHumans);

    return session;
}