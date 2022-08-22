export const carSelector = (menu, direction) => {

    if (!menu.inputControl.menuTimeOut) {

        const moveDistance = 95;

        switch (direction) {

            case 'left':

                if (menu.currentCell !== 1) {

                    menu.selector.x -= moveDistance;
                    menu.currentCell--;
                    menu.selectedCar--;
                }

                break;

            case 'right':

                if (menu.currentCell !== menu.numberOfCells) {

                    menu.selector.x += moveDistance;
                    menu.currentCell++;
                    menu.selectedCar++;
                }
                break;


            case 'up':

                if (menu.currentRow !== 1) {

                    menu.selector.y -= moveDistance;
                    menu.currentRow--;
                    menu.selectedCar -= menu.numberOfCells;

                }
                break;

            case 'down':

                if (menu.currentRow !== menu.numberOfRows) {

                    menu.selector.y += moveDistance;
                    menu.currentRow++;
                    menu.selectedCar += menu.numberOfCells;

                }
                break;
        }
    }
}