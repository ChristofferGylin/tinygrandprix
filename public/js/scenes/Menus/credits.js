import { creditsContent } from "./menuContent/creditsContent.js";

export class Credits extends Phaser.Scene {
    constructor(config) {
        super('Credits');

    }

    init(data) {

        this.inputControl = data.inputControl;
        this.goBack = () => {

            if (!this.inputControl.menuTimeout) {
                this.scene.start('TitleScreen')

            }


        };
    }

    preload() {


    }

    create() {
        this.defaultScrollSpeed = -1;
        this.scrollSpeed = this.defaultScrollSpeed;
        this.cameras.main.setBackgroundColor(0x1720d1)
        this.textStyle = { fontFamily: 'Monospace', fontSize: 40, color: '#ebeced' };
        this.textStyleSelected = { fontFamily: 'Monospace', fontSize: 46, color: '#ffffff' };

        const gameWidth = this.game.config.width;
        const gameHeight = this.game.config.height;

        let yPoint = gameHeight + 30;
        let xTitle = (gameWidth / 2) - 10;
        let xName = (gameWidth / 2) + 10;

        this.creditsGroup = new Phaser.GameObjects.Group(this);

        creditsContent.forEach(credit => {
            const title = this.add.text(xTitle, yPoint, credit.title, this.textStyle).setOrigin(1, 0.5).setShadow(2, 2, 'black', 0, true);
            let name;

            if (credit.name === undefined || credit.name === null) {

                name = this.add.text(xName, yPoint, 'CHRISTOFFER GYLIN', this.textStyle).setOrigin(0, 0.5).setShadow(2, 2, 'black', 0, true);

            } else {

                name = this.add.text(xName, yPoint, credit.name, this.textStyle).setOrigin(0, 0.5).setShadow(2, 2, 'black', 0, true);

            }



            this.creditsGroup.add(title);
            this.creditsGroup.add(name);

            if (credit.title2 !== undefined && credit.title2 !== null) {

                yPoint += 50;
                const title2 = this.add.text(title.x, yPoint, credit.title2, this.textStyle).setOrigin(1, 0.5).setShadow(2, 2, 'black', 0, true);
                this.creditsGroup.add(title2);
            }

            yPoint += 50;
        });

        window.addEventListener('keyup', this.goBack);
        window.addEventListener('click', this.goBack);
    }

    update() {



        if (!this.inputControl.menuTimeout) {

            if (this.inputControl.menu.input.sum.down) this.goBack();
            if (this.inputControl.menu.input.sum.up) this.goBack();
            if (this.inputControl.menu.input.sum.select) this.goBack();
            if (this.inputControl.menu.input.sum.back) this.goBack();

        }

        this.creditsGroup.incY(this.scrollSpeed);

        const children = this.creditsGroup.getChildren();

        let isScrollFinished = children.every((e) => {

            return e.y < -100

        });

        if (isScrollFinished) this.goBack();
    }
}