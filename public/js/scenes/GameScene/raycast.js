export const raycast = (player, bodies, game) => {

    let targetCar = player.car.carObject;
    let wantsArray = [];
    let obstacleArrayLeft = [false, false, false, false, false];
    let obstacleArrayRight = [false, false, false, false, false];
    let result = 0;
    const rayLength = 1000;
    let endPoint = { x: 0, y: 0 };
    const startPoint = { x: targetCar.body.position.x, y: targetCar.body.position.y };
    const lineMinLength = 15;
    const lineMaxLength = 30;
    const numberOfLines = 4;

    if (player.ai) {

        for (let i = 0; i < 4; i++) {

            const obstacleRayLength = Math.round(lineMaxLength - ((lineMaxLength - lineMinLength) * (i / numberOfLines)));
            endPoint.x = (Math.cos(targetCar.body.angle + ((360 * (i / 16)) * (Math.PI / 180))) * obstacleRayLength) + targetCar.body.position.x;
            endPoint.y = (Math.sin(targetCar.body.angle + ((360 * (i / 16)) * (Math.PI / 180))) * obstacleRayLength) + targetCar.body.position.y;
            const collisions = Phaser.Physics.Matter.Matter.Query.ray(player.otherCars, startPoint, endPoint);
            if (collisions.length > 0) {
                obstacleArrayLeft[i] = true;

            }

        }

        for (let i = 1; i < 5; i++) {

            const obstacleRayLength = Math.round(lineMaxLength - ((lineMaxLength - lineMinLength) * (i / numberOfLines)));
            endPoint.x = (Math.cos(targetCar.body.angle - ((360 * (i / 16)) * (Math.PI / 180))) * obstacleRayLength) + targetCar.body.position.x;
            endPoint.y = (Math.sin(targetCar.body.angle - ((360 * (i / 16)) * (Math.PI / 180))) * obstacleRayLength) + targetCar.body.position.y;
            const collisions = Phaser.Physics.Matter.Matter.Query.ray(player.otherCars, startPoint, endPoint);
            if (collisions.length > 0) {
                obstacleArrayRight[i] = true;

            }
        }

    }


    let distanceToCheckpoint = undefined;

    for (let i = 0; i < 8; i++) {

        const endPoint = { x: (Math.cos(targetCar.body.angle + ((360 * (i / 16)) * (Math.PI / 180))) * rayLength) + targetCar.body.position.x, y: (Math.sin(targetCar.body.angle + ((360 * (i / 16)) * (Math.PI / 180))) * rayLength) + targetCar.body.position.y };
        const collisions = Phaser.Physics.Matter.Matter.Query.ray(bodies, startPoint, endPoint);
        collisions.forEach(collision => {

            if (collision.body.checkpointNumber === player.nextCheckpoint) {

                let newDistance = Phaser.Math.Distance.Between(targetCar.body.position.x, targetCar.body.position.y, collision.body.position.x, collision.body.position.y);

                if (distanceToCheckpoint === undefined) {
                    distanceToCheckpoint = newDistance;
                } else if (newDistance < distanceToCheckpoint) {
                    distanceToCheckpoint = newDistance;
                }

                if (!obstacleArrayLeft[i]) {
                    if (i > 3) {

                        wantsArray.push(1);

                    } else {

                        wantsArray.push(i * 0.25);

                    }
                }


            }
        });
    }

    for (let i = 1; i < 9; i++) {


        const endPoint = { x: (Math.cos(targetCar.body.angle - ((360 * (i / 16)) * (Math.PI / 180))) * rayLength) + targetCar.body.position.x, y: (Math.sin(targetCar.body.angle - ((360 * (i / 16)) * (Math.PI / 180))) * rayLength) + targetCar.body.position.y };

        const collisions = Phaser.Physics.Matter.Matter.Query.ray(bodies, startPoint, endPoint);
        collisions.forEach(collision => {
            if (collision.body.checkpointNumber === player.nextCheckpoint) {

                let newDistance = Phaser.Math.Distance.Between(targetCar.body.position.x, targetCar.body.position.y, collision.body.position.x, collision.body.position.y);

                if (distanceToCheckpoint === undefined) {
                    distanceToCheckpoint = newDistance;
                } else if (newDistance < distanceToCheckpoint) {
                    distanceToCheckpoint = newDistance;
                }

                if (!obstacleArrayRight[i]) {

                    if (i > 3) {

                        wantsArray.push(-1);

                    } else {

                        wantsArray.push(i * -0.25);

                    }

                }

            }
        });
    }

    player.distanceToCheckpoint = distanceToCheckpoint;


    if (wantsArray.length > 0) {

        wantsArray.forEach(want => {
            result += want;
        });

        result = result / wantsArray.length;

    }



    if (result < -0.20) {
        result = -1;
    } else if (result > 0.20) {
        result = 1;
    }

    if ((result < 0.20 && result >= 0) && (result > -0.20 && result < 0)) {

        let carLeft = false;
        let carRight = false;
        let carStraight = false;

        for (let i = 0; i < obstacleArrayLeft.length; i++) {

            if (obstacleArrayLeft[i]) {
                if (i === 0) {
                    carStraight = true;
                } else {
                    carLeft = true;
                }
            }

        }

        obstacleArrayRight.forEach(ray => {
            if (ray) {
                carRight = true;
                return
            }
        });


        if (carLeft && !carRight) {
            result = 1;
        } else if (!carLeft && carRight) {
            result = -1;
        } else if ((carLeft && carRight) || carStraight) {
            if (result < 0) {
                result = -1;
            } else {
                result = 1;
            }
        }
    }

    return result;
}