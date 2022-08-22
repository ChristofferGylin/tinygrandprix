export const nextTrack = (menu, left) => {

    if (left) {

        menu.selectedTrack--;
        if (menu.selectedTrack < 0) {

            menu.selectedTrack = menu.tracks.length - 1;

            if (menu.selectedTrack < 0) menu.selectedTrack = 0;

        }
        menu.trackThumbnailNext.setFrame(menu.tracks[menu.selectedTrack].thumbnail);
        menu.trackThumbnailNext.x = menu.trackThumbnailRightX;
        menu.moveThumb = 'left';


    } else {

        menu.selectedTrack++;

        if (menu.selectedTrack >= menu.tracks.length) menu.selectedTrack = 0;

        menu.trackThumbnailNext.setFrame(menu.tracks[menu.selectedTrack].thumbnail);
        menu.trackThumbnailNext.x = menu.trackThumbnailLeftX;
        menu.moveThumb = 'right';
    }

}