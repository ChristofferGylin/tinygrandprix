import { carsSet1 } from "../../cars/sets/carsSet1.js";

export const drawCarMenu = (scene) => {

    const gameWidth = scene.game.config.width;
    const gameHeight = scene.game.config.height;
    const smallCellDimension = (48 * scene.scaleFactor) - 1
    const xStartPoint = (gameWidth / 2) - (((scene.numberOfCells * smallCellDimension) + (10 * scene.scaleFactor)) / 2);
    const yStartPoint = (gameHeight / 2) - 100;
    let xPoint = xStartPoint;
    scene.yPoint = yStartPoint;

    for (let i = 0; i < scene.numberOfCars; i++) {

        let carNumber;
        let carPosition;

        if (i < 6) {

            carNumber = i;

        } else {

            carNumber = i - 6;

        }

        if (scene.numberOfCars < 6) {

            // Single Row

            scene.selectionGridHeight = 58;

            if (i === 0) {

                const frame = scene.add.image(xPoint, scene.yPoint, 'ui-icons', 'selection-grid-single-row-left.png').setOrigin(0, 0).setScale(2);
                carPosition = frame.getCenter();
                carPosition.x += 5;
                const car = scene.add.image(carPosition.x, carPosition.y, 'cars', carsSet1[carNumber].imgName).setOrigin(0.5).setScale(2);
                scene.selectorPosition = carPosition;
                car.angle = -90;
                xPoint += 105;

            } else if (i === numberOfCars - 1) {

                const frame = scene.add.image(xPoint, scene.yPoint, 'ui-icons', 'selection-grid-single-row-right.png').setOrigin(0, 0).setScale(2);
                carPosition = frame.getCenter();
                carPosition.x -= 5;
                const car = scene.add.image(carPosition.x, carPosition.y, 'cars', carsSet1[carNumber].imgName).setScale(2);
                car.angle = -90;

            } else {

                const frame = scene.add.image(xPoint, scene.yPoint, 'ui-icons', 'selection-grid-single-row-middle.png').setOrigin(0, 0).setScale(2);
                carPosition = frame.getCenter();
                const car = scene.add.image(carPosition.x, carPosition.y, 'cars', carsSet1[carNumber].imgName).setScale(2);
                car.angle = -90;
                xPoint += 95;

            }
        } else {

            // Multiple Rows

            scene.selectionGridHeight = 58 * scene.numberOfRows;

            if (i < scene.numberOfCells) {

                // Top Row

                if (i === 0) {

                    const frame = scene.add.image(xPoint, scene.yPoint, 'ui-icons', 'selection-grid-top-left.png').setOrigin(0, 0).setScale(2);
                    carPosition = frame.getCenter();
                    carPosition.x += 5;
                    carPosition.y += 5;
                    const car = scene.add.image(carPosition.x, carPosition.y, 'cars', carsSet1[carNumber].imgName).setOrigin(0.5).setScale(2);
                    scene.selectorPosition = carPosition;
                    car.angle = -90;
                    xPoint += scene.bigCellDimension;

                } else if ((i + 1) % scene.numberOfCells === 0) {

                    const frame = scene.add.image(xPoint, scene.yPoint, 'ui-icons', 'selection-grid-top-right.png').setOrigin(0, 0).setScale(2);
                    carPosition = frame.getCenter();
                    carPosition.x -= 5;
                    carPosition.y += 5;
                    const car = scene.add.image(carPosition.x, carPosition.y, 'cars', carsSet1[carNumber].imgName).setScale(2);
                    car.angle = -90;
                    xPoint = xStartPoint;
                    scene.yPoint += scene.bigCellDimension;
                    scene.numberOfRows++;

                } else {

                    const frame = scene.add.image(xPoint, scene.yPoint, 'ui-icons', 'selection-grid-top-middle.png').setOrigin(0, 0).setScale(2);
                    carPosition = frame.getCenter();
                    carPosition.y += 5;
                    const car = scene.add.image(carPosition.x, carPosition.y, 'cars', carsSet1[carNumber].imgName).setOrigin(0.5).setScale(2);
                    car.angle = -90;
                    xPoint += smallCellDimension;

                }

            } else if (i >= scene.numberOfCars - scene.numberOfCells) {

                // Bottom Row

                if ((i + scene.numberOfCells) % scene.numberOfCells === 0) {

                    const frame = scene.add.image(xPoint, scene.yPoint, 'ui-icons', 'selection-grid-bottom-left.png').setOrigin(0, 0).setScale(2);
                    carPosition = frame.getCenter();
                    carPosition.x += 5;
                    carPosition.y -= 5;
                    const car = scene.add.image(carPosition.x, carPosition.y, 'cars', carsSet1[carNumber].imgName).setScale(2);
                    car.angle = -90;
                    xPoint += scene.bigCellDimension;

                } else if (i + 1 === scene.numberOfCars) {

                    const frame = scene.add.image(xPoint, scene.yPoint, 'ui-icons', 'selection-grid-bottom-right.png').setOrigin(0, 0).setScale(2);
                    carPosition = frame.getCenter();
                    carPosition.x -= 5;
                    carPosition.y -= 5;
                    const car = scene.add.image(carPosition.x, carPosition.y, 'cars', carsSet1[carNumber].imgName).setScale(2);
                    car.angle = -90;

                }
                else {

                    const frame = scene.add.image(xPoint, scene.yPoint, 'ui-icons', 'selection-grid-bottom-middle.png').setOrigin(0, 0).setScale(2);
                    carPosition = frame.getCenter();
                    carPosition.y -= 5;
                    const car = scene.add.image(carPosition.x, carPosition.y, 'cars', carsSet1[carNumber].imgName).setScale(2);
                    car.angle = -90;
                    xPoint += smallCellDimension;

                }
            } else {

                // Middle Row

                if ((i + scene.numberOfCells) % scene.numberOfCells === 0) {

                    const frame = scene.add.image(xPoint, scene.yPoint, 'ui-icons', 'selection-grid-middle-left.png').setOrigin(0, 0).setScale(2);
                    carPosition = frame.getCenter();
                    carPosition.x += 5;
                    const car = scene.add.image(carPosition.x, carPosition.y, 'cars', carsSet1[carNumber].imgName).setScale(2);
                    car.angle = -90;
                    xPoint += scene.bigCellDimension;

                } else if ((i + 1) % scene.numberOfCells === 0) {

                    const frame = scene.add.image(xPoint, scene.yPoint, 'ui-icons', 'selection-grid-middle-right.png').setOrigin(0, 0).setScale(2);
                    carPosition = frame.getCenter();
                    carPosition.x -= 5;
                    const car = scene.add.image(carPosition.x, carPosition.y, 'cars', carsSet1[carNumber].imgName).setScale(2);
                    car.angle = -90;
                    xPoint = xStartPoint;
                    scene.yPoint += smallCellDimension;
                    scene.numberOfRows++;

                } else {

                    const frame = scene.add.image(xPoint, scene.yPoint, 'ui-icons', 'selection-grid-middle-middle.png').setOrigin(0, 0).setScale(2);
                    carPosition = frame.getCenter();
                    const car = scene.add.image(carPosition.x, carPosition.y, 'cars', carsSet1[carNumber].imgName).setScale(2);
                    car.angle = -90;
                    xPoint += smallCellDimension;

                }
            }
        }
    }

    scene.selector = scene.add.image(scene.selectorPosition.x, scene.selectorPosition.y, 'ui-icons', 'selector-green.png').setOrigin(0.5).setScale(2);
    scene.selectorStartPosition = scene.selectorPosition;

}