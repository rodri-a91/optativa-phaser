import { Scoreboard } from "./components/Scoreboard.js";

export class Game extends Phaser.Scene {
    constructor() {
        super({ key: 'game' });
    }
    // Inicializamos el marcador
    init() {
        this.Scoreboard = new Scoreboard(this);
    }

    preload() {
        this.load.image('background', 'images/background2.jpg');
        this.load.image('gameover', 'images/gameover.png');
        this.load.image('platform', 'images/platform.png');
        this.load.image('ball', 'images/ball.png');
    }

    create() {
        this.add.image(400, 250, 'background');

        this.gameoverImage = this.add.image(400, 90, 'gameover');

        // Texto de marcador
        this.scoreText = this.add.text(16, 16, 'PUNTOS: 0', {
            fontSize: '20px',
            fill: '#fff',
            fontFamily: 'verdana, arial, sans-serif'
        });
        this.gameoverImage.visible = false;
        // Colisión de los laterales y el techo
        this.physics.world.setBoundsCollision(true, true, true, false);

        this.platform = this.physics.add.image(400, 460, 'platform').setImmovable();

        this.platform.body.allowGravity = false;

        this.ball = this.physics.add.image(400, 30, 'ball');
        this.ball.setCollideWorldBounds(true);
        this.platform.setCollideWorldBounds(true);
        this.physics.world.checkCollision.down = false;
        // Rebote de la bola
        this.ball.setBounce(1);
        let velocity = 100 * Phaser.Math.Between(1.3, 2);
        if (Phaser.Math.Between(0, 10) > 5) {
            velocity = 0 - velocity;
        }
        this.ball.setVelocity(velocity, 10);

        // Colisión entre la bola y plataforma
        this.physics.add.collider(this.ball, this.platform, this.platformImpact, null, this);

        this.cursors = this.input.keyboard.createCursorKeys();

        //this.platform.setVelocity(100,10);

    }

    update() {
        if (this.cursors.left.isDown) {
            this.platform.setVelocityX(-500);

        }
        else if (this.cursors.right.isDown) {
            this.platform.setVelocityX(500);
        }
        else this.platform.setVelocityX(0);

        // Control del game over
        if (this.ball.y > 500) {
            console.log("Game over...");
            this.gameoverImage.visible = true;
            this.scene.pause();
        }
    }
    platformImpact() {
        this.score = this.score + 100;
        this.scoreText.setText('PUNTOS: ' + this.score);
    }

    // ejecutar() {
    //     console.log("choque")
    //     // this.ball.setVelocity(10,-800);
    // }
}