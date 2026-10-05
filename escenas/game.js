import { Scoreboard } from "../components/Scoreboard.js";

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
        // this.load.image('gameover', 'images/gameover.png');
        this.load.image('platform', 'images/platform.png');
        this.load.image('ball', 'images/ball.png');
        this.load.image('blackbrick', 'images/brickBlack.png');
        this.load.image('bluebrick', 'images/brickBlue.png');
        this.load.image('greenbrick', 'images/brickGreen.png');
        this.load.image('orangebrick', 'images/brickOrange.png');
        // this.load.image('congrats', 'images/congratulations.png');
    }

    create() {
        this.add.image(400, 250, 'background');

        // Llamamos el marcador
        this.Scoreboard.create();

        // Colocamos los bricks en un grupo
        // this.miGrupo = this.physics.add.staticGroup();
        // this.miGrupo.create(254,244, 'bluebrick');
        // this.miGrupo.create(375,244, 'greenbrick');

        this.bricks = this.physics.add.staticGroup({
            key: ['bluebrick', 'greenbrick', 'blackbrick', 'orangebrick'],
            frameQuantity: 10,
            gridAlign: {
                width: 10,
                height: 4,
                cellWidth: 67,
                cellHeight: 34,
                x: 112,
                y: 60
            }
        })

        // this.gameoverImage = this.add.image(400, 90, 'gameover');
        // this.gameoverImage.visible = false;

        // this.congratsImage = this.add.image(400, 90, 'congrats');
        // this.congratsImage.visible = false;

        // Colisión de los laterales y el techo
        this.physics.world.setBoundsCollision(true, true, true, false);

        this.platform = this.physics.add.image(385, 460, 'platform').setImmovable();

        this.platform.body.allowGravity = false;

        this.ball = this.physics.add.image(385, 430, 'ball');
        this.ball.setData('glue', true);
        this.ball.setCollideWorldBounds(true);
        this.platform.setCollideWorldBounds(true);
        this.physics.world.checkCollision.down = false;
        // Rebote de la bola
        this.ball.setBounce(1);

        // Añade dirección y velocidad aleatorias a la bola
        // let velocity = 100 * Phaser.Math.Between(1.3, 2);
        // if (Phaser.Math.Between(0, 10) > 5) {
        //     velocity = 0 - velocity;
        // }
        // this.ball.setVelocity(velocity, 10);

        // Colisión entre la bola y plataforma
        this.physics.add.collider(this.ball, this.platform, this.platformImpact, null, this);

        // Colisión entre la bola y los ladrillos
        this.physics.add.collider(this.ball, this.bricks, this.brickImpact, null, this);

        this.cursors = this.input.keyboard.createCursorKeys();

        //this.platform.setVelocity(100,10);

    }

    update() {
        if (this.cursors.left.isDown) {
            this.platform.setVelocityX(-500);
            if (this.ball.getData('glue')) {
                this.ball.setVelocityX(-500);
            }

        }
        else if (this.cursors.right.isDown) {
            this.platform.setVelocityX(500);
            if (this.ball.getData('glue')) {
                this.ball.setVelocityX(500);
            }
        }
        else {
            this.platform.setVelocityX(0);
            if (this.ball.getData('glue')) {
                this.ball.setVelocityX(0);
            }
        }

        if (this.cursors.up.isDown) {
            if (this.ball.getData('glue')) {
                this.ball.setVelocity(-75, -300);
                this.ball.setData('glue', false);

            }
        }
        // if (this.cursors.space.isDown) {
        //     this.scene.restart();
        // }

        // Control del game over
        if (this.ball.y > 500) {
            // console.log("Game over...");
            // this.gameoverImage.visible = true;
            // this.scene.pause();
            // this.bricks.setVisible(false);
            this.showGameOver();
        }

        
    }

    showGameOver() {
        this.scene.start('gameover');
    }

    platformImpact(ball, platform) {
        let relativeImpact = ball.x - platform.x;
        console.log(relativeImpact);

        // Ajustamos la velocidad
        if (relativeImpact < 0.1 && relativeImpact > -0.1) {
            ball.setVelocityX(Phaser.Math.Between(-10, 10))
        }
        else {
            ball.setVelocityX(10 * relativeImpact);
        }
    }

    brickImpact(ball, brick) {
        brick.disableBody(true, true);
        this.Scoreboard.incrementPoints(100);
        if (this.bricks.countActive() === 0) {
            // this.congratsImage.visible = true;
            // this.scene.pause();
            this.showCongratulations();
        }

    }

    showCongratulations() {
        this.scene.start('congratulations');
    }



    // ejecutar() {
    //     console.log("choque")
    //     // this.ball.setVelocity(10,-800);
    // }
}