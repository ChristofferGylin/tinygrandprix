import { scaleValue } from "./scaleValue.js";

export function cubeCurve(inputSignal) {

    let scaledValue = scaleValue(inputSignal, [0, 1], [0, 10]);
    let returnValue = Math.pow(scaledValue, 3) / 1000;
    return returnValue;
}