export const timer = (raceSession, scene) => {

    let millis = scene.scene.time.now - raceSession.timer.startTime;

    raceSession.timer.parts.forEach(partTime => {
        millis += partTime;
    });

    millis = Math.round(millis);

    let rest = millis % 3600000;
    let hours = (millis - rest) / 3600000;

    millis = rest;
    rest = millis % 60000;
    let minutes = (millis - rest) / 60000;
    millis = rest;
    rest = millis % 1000;
    let seconds = (millis - rest) / 1000;
    millis = Math.round(rest / 10);

    if (millis > 99) millis = 99;

    let hoursText;
    let minutesText;
    let secondsText;
    let millisText;

    if (hours < 10) {
        hoursText = `0${hours}`;
    } else {
        hoursText = `${hours}`;
    }

    if (minutes < 10) {
        minutesText = `0${minutes}`;
    } else {
        minutesText = `${minutes}`;
    }

    if (seconds < 10) {
        secondsText = `0${seconds}`;
    } else {
        secondsText = `${seconds}`;
    }

    if (millis < 10) {
        millisText = `0${millis}`;
    } else {
        millisText = `${millis}`
    }

    const textValue = `${minutesText}.${secondsText}:${millisText}`;

    raceSession.timer.textValue = textValue;

}