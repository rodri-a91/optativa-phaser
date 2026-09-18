export class Game extends Phaser.Scene {
    constructor() {
        super({key: 'game'});
    }

    preload(){
        this.load.image('background', 'images/background.png');
        this.load.image('gameover', 'images/gameover.png');
    }

    create() {
        this.add.image(400,250,'background');

    }
}