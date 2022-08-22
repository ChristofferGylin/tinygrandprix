export class PlayerInput {

    constructor(playerNumber) {

        this.hasGamePad = false;
        this.checkGamePad = null;
        this.playerNumber = playerNumber;
        this.input = {

            keys: {

                throttle: false,
                brake: false,
                left: false,
                right: false,
                nitro: false,
                reverse: false,
                pause: false,
                zoom: false

            },

            gamePad: {

                throttle: 0,
                brake: 0,
                direction: 0,
                nitro: false,
                reverse: false,
                pause: false,
                zoom: false

            },

            sum: {

                throttle: 0,
                brake: 0,
                direction: 0,
                nitro: false,
                reverse: false,
                pause: false,
                zoom: false

            }

        };

        this.inputMenu = {

            keys: {

                up: false,
                down: false,
                left: false,
                right: false,
                back: false,
                select: false

            },

            gamePad: {

                up: false,
                down: false,
                left: false,
                right: false,
                back: false,
                select: false

            },

            sum: {

                throttle: false,
                brake: false,
                left: false,
                right: false,
                nitro: false,
                reverse: false,
                pause: false,
                zoom: false

            }

        };

        this.controls = {

            keys: null,
            gamePad: null

        };

    }
}

