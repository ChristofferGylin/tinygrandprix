import { allTracks } from "../../tracks/allTracks.js";
import { setSelector } from "./setSelector.js";
import { drawMenu } from "./drawMenu.js";
import { nextTrack } from "./nextTrack.js";
import { moveThumb } from "./moveThumb.js";

export class SelectTrack extends Phaser.Scene {
    constructor(config) {

        super('SelectTrack');
        this.menuContent = config.menuContent;

    }

    init(data) {

        this.gameSettings = data.gameSettings;
        this.gameConfig = data;
        this.inputControl = data.inputControl;

    }

    create() {

        this.selectedTrack = 0;
        this.tracks = allTracks;
        this.moveThumb = false;
        this.moveSpeed = 1;

        const gameWidth = this.game.config.width;
        const gameHeight = this.game.config.height;

        if (this.gameConfig.numberOfPlayers > 1) {

            this.menuContent.menuItems[this.menuContent.menuItems.length - 1].scene = 'LocalMultiplayerMenu';

        } else {

            this.menuContent.menuItems[this.menuContent.menuItems.length - 1].scene = 'SinglePlayerMenu';

        }

        this.cameras.main.setBackgroundColor(0x1720d1)
        this.menuSelection = 0;
        this.textStyle = { fontFamily: 'Monospace', fontSize: 40, color: '#ebeced' };
        this.headlineStyle = { fontFamily: 'Monospace', fontSize: 56, color: '#ffffff' };
        this.textStyleSelected = { fontFamily: 'Monospace', fontSize: 46, color: '#ffffff' };

        this.add.text(gameWidth / 2, 56, 'SELECT TRACK', this.headlineStyle).setOrigin(0.5, 0).setShadow(2, 2, 'black', 0, true);

        this.trackThumbnailX = gameWidth / 2;
        this.trackThumbnailLeftX = (gameWidth / 2) - 400;
        this.trackThumbnailRightX = (gameWidth / 2) + 400;

        this.trackThumbnail = this.add.image(this.trackThumbnailX, gameHeight / 2, 'track-thumbnails', allTracks[0].thumbnail).setOrigin(0.5, 0.5);
        this.trackThumbnailNext = this.add.image(this.trackThumbnailLeftX, gameHeight / 2, 'track-thumbnails', allTracks[1].thumbnail).setOrigin(0.5, 0.5);
        let trackThumbnailTopLeft = this.trackThumbnail.getTopLeft();
        const shape = this.make.graphics();
        shape.fillStyle(0xffffff);
        shape.fillRect(trackThumbnailTopLeft.x, trackThumbnailTopLeft.y, 400, 400);
        const mask = shape.createGeometryMask();
        this.trackThumbnail.setMask(mask);
        this.trackThumbnailNext.setMask(mask);
        let leftArrow = this.add.image(this.trackThumbnail.x - (this.trackThumbnail.width / 2) - 100, this.trackThumbnail.y, 'ui-icons', 'left-menu-arrow.png');
        let rightArrow = this.add.image(this.trackThumbnail.x + (this.trackThumbnail.width / 2) + 100, this.trackThumbnail.y, 'ui-icons', 'right-menu-arrow.png');
        let trackThumbnailBottomCenter = this.trackThumbnail.getBottomCenter();

        drawMenu(this, trackThumbnailBottomCenter.y);
        setSelector(this);

    }

    update() {

        if (!this.inputControl.menuTimeout) {

            let lastSelection = this.menuSelection;

            if (this.inputControl.menu.input.sum.down) {

                if (this.menuSelection === this.menuContent.menuItems.length - 1) {


                    this.menuSelection = 0;

                } else {

                    this.menuSelection++;

                }

                setSelector(this, lastSelection);

            }

            if (this.inputControl.menu.input.sum.up) {

                if (this.menuSelection === 0) {

                    this.menuSelection = this.menuContent.menuItems.length - 1;

                } else {

                    this.menuSelection--;

                }

                setSelector(this, lastSelection);

            }

            if (!this.moveThumb) {

                if (this.inputControl.menu.input.sum.left) {

                    nextTrack(this, true);

                } else if (this.inputControl.menu.input.sum.right) {

                    nextTrack(this);

                }

            }

            if (this.inputControl.menu.input.sum.select) {

                this.gameConfig.track = this.selectedTrack;
                let data = this.gameConfig;
                data.gameSettings = this.gameSettings;
                this.scene.launch(this.menuContent.menuItems[this.menuSelection].scene, data);
                this.scene.stop(this.menuContent.sceneName);

            }

            if (this.inputControl.menu.input.sum.back) {
                let data = this.gameConfig;
                data.gameSettings = this.gameSettings;
                data.inputControl = this.inputControl;
                this.scene.launch(this.menuContent.menuItems[this.menuContent.menuItems.length - 1].scene, data);
                this.scene.stop(this.menuContent.sceneName);

            }
        }





        if (this.moveThumb) {

            moveThumb(this);

        }
    }
}