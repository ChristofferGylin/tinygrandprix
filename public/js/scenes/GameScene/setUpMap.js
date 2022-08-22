import { setUpCheckpoints } from "./setUpCheckpoints.js";

export const setUpMap = (game) => {

    const map = game.make.tilemap({ key: game.raceSession.track.key });

    game.raceSession.track.tilesets.forEach(tileSet => {
        map.addTilesetImage(tileSet.name, tileSet.key);
    });

    game.raceSession.track.layers.forEach(layer => {

        const newLayer = map.createStaticLayer(layer.name, layer.tileset, 0, 0);

        if (layer.obstacle) {

            map.setCollisionByExclusion([-1, 0]);
            game.matter.world.convertTilemapLayer(newLayer);
            game.raceSession.track.obstacles.push(newLayer);

        }
    });

    const aiCheckpoints = map.getObjectLayer('aiCheckpoints');
    const checkpoints = map.getObjectLayer('checkpoints');
    const cornerPoints = map.getObjectLayer('cornerPoints');
    const aiCornerPoints = map.getObjectLayer('aiCornerPoints');

    game.raceSession.track.aiCheckPointsArray = setUpCheckpoints(aiCheckpoints, aiCornerPoints, 'aiCheckpoint', game);
    setUpCheckpoints(checkpoints, cornerPoints, 'checkpoint', game);

}