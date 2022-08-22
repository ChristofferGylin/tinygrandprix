export const moveThumb = (menu) => {

    if (menu.moveThumb === 'left') {

        if (menu.trackThumbnail.x > menu.trackThumbnailLeftX) {


            if (menu.trackThumbnail.x > menu.trackThumbnailX - 150) {


                if (menu.moveSpeed < 30) menu.moveSpeed += 2;
            } else if (menu.trackThumbnail.x < menu.trackThumbnailLeftX + 150) {
                if (menu.moveSpeed > 1) menu.moveSpeed -= 2;
            }

            if ((menu.trackThumbnail.x - menu.moveSpeed) < menu.trackThumbnailLeftX) {

                menu.trackThumbnail.x = menu.trackThumbnailLeftX;
                menu.trackThumbnailNext.x = menu.trackThumbnailX;

            } else {

                menu.trackThumbnailNext.x -= menu.moveSpeed;
                menu.trackThumbnail.x -= menu.moveSpeed;

            }

        } else {

            menu.trackThumbnail.setFrame(menu.tracks[menu.selectedTrack].thumbnail);
            menu.trackThumbnail.x = menu.trackThumbnailX;
            menu.trackThumbnailNext.x = menu.trackThumbnailLeftX;

            menu.moveSpeed = 1;
            menu.moveThumb = false;

        }

    } else {

        if (menu.trackThumbnail.x < menu.trackThumbnailRightX) {

            if (menu.trackThumbnail.x < menu.trackThumbnailX + 150) {
                if (menu.moveSpeed < 30) menu.moveSpeed += 2;
            } else if (menu.trackThumbnail.x > menu.trackThumbnailRightX - 150) {
                if (menu.moveSpeed > 1) menu.moveSpeed -= 2;
            }

            if ((menu.trackThumbnail.x + menu.moveSpeed) > menu.trackThumbnailRightX) {

                menu.trackThumbnail.x = menu.trackThumbnailRightX;
                menu.trackThumbnailNext.x = menu.trackThumbnailX;

            } else {

                menu.trackThumbnailNext.x += menu.moveSpeed;
                menu.trackThumbnail.x += menu.moveSpeed;

            }

        } else {

            menu.trackThumbnail.setFrame(menu.tracks[menu.selectedTrack].thumbnail);
            menu.trackThumbnail.x = menu.trackThumbnailX;
            menu.trackThumbnailNext.x = menu.trackThumbnailLeftX;
            menu.moveSpeed = 1;
            menu.moveThumb = false;

        }
    }
}