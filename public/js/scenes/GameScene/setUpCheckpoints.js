export const setUpCheckpoints = (checkpointArray, cornerArray, label, game) => {

    let returnArray = [];

    checkpointArray.objects.forEach(checkpoint => {

        let newRect

        if (checkpoint.rotation !== 0) {
            let coords = { x: 0, y: 0 };

            cornerArray.objects.forEach(cornerpoint => {
                if (cornerpoint.properties[0].value === checkpoint.properties[0].value) {
                    coords.x = cornerpoint.x;
                    coords.y = cornerpoint.y;
                    return;
                }
            });

            newRect = game.matter.world.create(coords.x, coords.y, checkpoint.width, checkpoint.height, { angle: Phaser.Math.DegToRad(checkpoint.rotation), label, isSensor: true, checkpointNumber: checkpoint.properties[0].value });


        } else {

            newRect = game.matter.world.create(checkpoint.x + (checkpoint.width / 2), checkpoint.y + (checkpoint.height / 2), checkpoint.width, checkpoint.height, { angle: Phaser.Math.DegToRad(checkpoint.rotation), label, isSensor: true, checkpointNumber: checkpoint.properties[0].value });

        }

        returnArray.push(newRect);

    });

    return returnArray;
}