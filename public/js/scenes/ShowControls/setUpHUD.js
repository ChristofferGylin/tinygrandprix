import { getPlayerPositions } from "./getPlayerPositions.js";

export const setUpHUD = (game) => {

    for (let i = 0; i < game.gameConfig.numberOfPlayers; i++) {

        let values;
        let horizontalLine;
        let verticalLine;
        switch (game.gameConfig.numberOfPlayers) {

            case 1:


                break;

            case 2:

                if (game.gameSettings.horizontalSplitscreen) {

                    // Split Screen Lines

                    horizontalLine = game.add.line(0, 0, 0, game.game.config.height / 2, game.game.config.width * 2, game.game.config.height / 2, 0xFFFFFF);
                    horizontalLine.setLineWidth(2);


                } else {

                    // Split Screen Lines

                    verticalLine = game.add.line(0, 0, game.game.config.width / 2, 0, game.game.config.width / 2, game.game.config.height * 2, 0xFFFFFF);
                    verticalLine.setLineWidth(2);


                }

                break;

            default:

                // Split Screen Lines

                horizontalLine = game.add.line(0, 0, 0, game.game.config.height / 2, game.game.config.width * 2, game.game.config.height / 2, 0xFFFFFF);
                horizontalLine.setLineWidth(2);
                verticalLine = game.add.line(0, 0, game.game.config.width / 2, 0, game.game.config.width / 2, game.game.config.height * 2, 0xFFFFFF);
                verticalLine.setLineWidth(2);


        }

        values = getPlayerPositions(game, i);


        // Position

        const playerTitle = game.add.text(values.playerTitle.x, values.playerTitle.y, `Player ${i + 1} Controls:`, { fontFamily: 'Monospace', fontSize: values.fontSize.default, color: 'white' }).setOrigin(values.playerTitle.origin.x, values.playerTitle.origin.y);
        playerTitle.setShadow(2, 2, 'black', 0, true);
        const xValue = playerTitle.getLeftCenter();

        const throttle = game.add.text(xValue.x, values.throttle.y, `Throttle:${game.gameSettings.players[i].controls.keys.throttle}`, { fontFamily: 'Monospace', fontSize: values.fontSize.default, color: 'white' }).setOrigin(values.throttle.origin.x, values.throttle.origin.y);
        throttle.setShadow(2, 2, 'black', 0, true);
        const brake = game.add.text(xValue.x, values.brake.y, `Brake:${game.gameSettings.players[i].controls.keys.brake}`, { fontFamily: 'Monospace', fontSize: values.fontSize.default, color: 'white' }).setOrigin(values.throttle.origin.x, values.throttle.origin.y);
        brake.setShadow(2, 2, 'black', 0, true);
        const left = game.add.text(xValue.x, values.left.y, `Left:${game.gameSettings.players[i].controls.keys.left}`, { fontFamily: 'Monospace', fontSize: values.fontSize.default, color: 'white' }).setOrigin(values.left.origin.x, values.left.origin.y);
        left.setShadow(2, 2, 'black', 0, true);
        const right = game.add.text(xValue.x, values.right.y, `Right:${game.gameSettings.players[i].controls.keys.right}`, { fontFamily: 'Monospace', fontSize: values.fontSize.default, color: 'white' }).setOrigin(values.right.origin.x, values.right.origin.y);
        right.setShadow(2, 2, 'black', 0, true);

    };
}