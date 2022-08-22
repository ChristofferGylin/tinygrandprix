import { gameSettings } from "../../gameSettings/gameSettings.js";

export class PreLoader extends Phaser.Scene {

    constructor() {
        super('PreLoader');
    }

    preload() {
        this.load.atlas('cars', 'assets/tilesets/cars.png', 'assets/tilemaps/cars.json');
        this.load.atlas('track-thumbnails', 'assets/tilesets/track-thumbnails.png', 'assets/tilemaps/track-thumbnails.json');
        this.load.atlas('ui-icons', 'assets/tilesets/ui-icons.png', 'assets/tilemaps/ui-icons.json');
        this.load.image('logo', 'assets/img/tiny-grand-prix-logo.png');
        this.load.json('carPhysics', 'assets/physics/car-physics.json');
        this.load.json('railing-physics', 'assets/physics/railing-physics.json');
        this.load.image('tiles', 'assets/tilesets/track-tileset1.png');
        this.load.image('tiles2', 'assets/tilesets/track-decal-tileset1.png');
    }

    create() {

        this.scene.start('InputControl', { gameSettings });

    }
}