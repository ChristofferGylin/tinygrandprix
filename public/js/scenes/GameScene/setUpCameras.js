export const setUpCameras = (raceSession, game) => {

    const cameraWidth = game.game.config.width * 2;
    const cameraHeight = game.game.config.height * 2;

    const onePlayer = {

        x: -(game.game.config.width / 2),
        y: -(game.game.config.height / 2),

        mask: undefined

    };

    const twoPlayers = {
        horizontal: [
            {
                x: -(game.game.config.width / 2),
                y: -((game.game.config.height / 4) * 3),

                mask: {
                    height: game.game.config.height / 2,
                    width: game.game.config.width,
                    x: 0,
                    y: 0
                }
            },

            {
                x: -(game.game.config.width / 2),
                y: -((game.game.config.height / 4) * 1),

                mask: {
                    height: game.game.config.height / 2,
                    width: game.game.config.width,
                    x: 0,
                    y: game.game.config.height / 2
                }
            }

        ],
        vertical: [
            {
                x: -((game.game.config.width / 4) * 3),
                y: -((game.game.config.height / 2)),

                mask: {
                    height: game.game.config.height,
                    width: game.game.config.width / 2,
                    x: 0,
                    y: 0
                }
            },

            {
                x: -((game.game.config.width / 4)),
                y: -((game.game.config.height / 2)),

                mask: {
                    height: game.game.config.height,
                    width: game.game.config.width / 2,
                    x: game.game.config.width / 2,
                    y: 0
                }
            }
        ]
    };

    const threeOrMore = [
        {
            x: -((game.game.config.width / 4) * 3),
            y: -((game.game.config.height / 4) * 3),

            mask: {
                height: game.game.config.height / 2,
                width: game.game.config.width / 2,
                x: 0,
                y: 0
            }
        },

        {
            x: -((game.game.config.width / 4)),
            y: -((game.game.config.height / 4) * 3),

            mask: {
                height: game.game.config.height / 2,
                width: game.game.config.width / 2,
                x: game.game.config.width / 2,
                y: 0
            }
        },

        {
            x: -((game.game.config.width / 4) * 3),
            y: -((game.game.config.height / 4) * 1),

            mask: {
                height: game.game.config.height / 2,
                width: game.game.config.width / 2,
                x: 0,
                y: game.game.config.height / 2
            }
        },

        {
            x: -((game.game.config.width / 4)),
            y: -((game.game.config.height / 4) * 1),

            mask: {
                height: game.game.config.height / 2,
                width: game.game.config.width / 2,
                x: game.game.config.width / 2,
                y: game.game.config.height / 2
            }
        }
    ];



    for (let i = 0; i < raceSession.players.length; i++) {

        if (!raceSession.players[i].ai) {

            let camera;
            const shape = game.make.graphics();
            shape.fillStyle(0xffffff);

            switch (raceSession.numberOfHumans) {

                case 1:

                    camera = game.cameras.add(onePlayer.x, onePlayer.y, cameraWidth, cameraHeight);
                    break;

                case 2:

                    if (raceSession.gameSettings.horizontalSplitscreen) {

                        camera = game.cameras.add(twoPlayers.horizontal[i].x, twoPlayers.horizontal[i].y, cameraWidth, cameraHeight);
                        shape.fillRect(twoPlayers.horizontal[i].mask.x, twoPlayers.horizontal[i].mask.y, twoPlayers.horizontal[i].mask.width, twoPlayers.horizontal[i].mask.height);

                    } else {

                        camera = game.cameras.add(twoPlayers.vertical[i].x, twoPlayers.vertical[i].y, cameraWidth, cameraHeight);
                        shape.fillRect(twoPlayers.vertical[i].mask.x, twoPlayers.vertical[i].mask.y, twoPlayers.vertical[i].mask.width, twoPlayers.vertical[i].mask.height);

                    }

                    break;

                default:

                    camera = game.cameras.add(threeOrMore[i].x, threeOrMore[i].y, cameraWidth, cameraHeight);
                    shape.fillRect(threeOrMore[i].mask.x, threeOrMore[i].mask.y, threeOrMore[i].mask.width, threeOrMore[i].mask.height);

            }

            if (raceSession.numberOfHumans !== 1) {

                const mask = shape.createGeometryMask();
                camera.setMask(mask);

            }


            camera.zoom = 2;
            camera.startFollow(raceSession.players[i].car.carObject);
            camera.roundPixels = true;
            camera.rotation = -(Phaser.Math.DegToRad(raceSession.players[i].car.carObject.angle + 90));
            raceSession.players[i].camera = camera;

        }
    }

    game.cameras.main.visible = false;

}