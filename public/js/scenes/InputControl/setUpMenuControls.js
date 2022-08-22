export const setUpMenuControls = (game) => {

    const keys = {

        up: game.input.keyboard.addKey('UP'),
        down: game.input.keyboard.addKey('DOWN'),
        left: game.input.keyboard.addKey('LEFT'),
        right: game.input.keyboard.addKey('RIGHT'),
        back: game.input.keyboard.addKey('ESC'),
        select: game.input.keyboard.addKey('SPACE')

    }
    const altKeys = {

        up: game.input.keyboard.addKey('W'),
        down: game.input.keyboard.addKey('S'),
        left: game.input.keyboard.addKey('A'),
        right: game.input.keyboard.addKey('D'),
        back: game.input.keyboard.addKey('BACKSPACE'),
        select: game.input.keyboard.addKey('ENTER')

    }

    return { keys, altKeys };

}

