export class Game extends Phaser.Scene {
    constructor() {
        super({ key: 'game' });
    }

    preload() {
        this.load.image('background', 'images/background.png');
        this.load.image('gameover', 'images/gameover.png');
        this.load.image('platform', 'images/platform.png');
    }

    create() {
        this.add.image(400, 250, 'background');
        this.gameoverImage = this.add.image(400, 90, 'gameover');
        this.gameoverImage.visible = false;

        this.platform = this.physics.add.image(100, 90, 'platform');
        this.platform2 = this.physics.add.image(200, 120, 'platform');
        this.platform3 = this.physics.add.image(500, 180, 'platform');

        // Gravedad de las plataformas
        this.platform.body.allowGravity = false;
        this.platform2.body.allowGravity = false;
        this.platform3.body.allowGravity = false;

        // Velocidad de las plataformas
        this.platform3.setVelocity(-50, 0);

        //Creación de jugador
        this.player = this.physics.add.sprite(0, 0, 'player');

        // Colisión de las plataformas
        this.physics.world.setBoundsCollision(true, true, true, true);
        this.physics.world.setBounds(0, 0, 800, 500);
        this.player.setCollideWorldBounds(true);
        this.platform.setCollideWorldBounds(true);
        this.platform2.setCollideWorldBounds(true);
        this.platform3.setCollideWorldBounds(true);

        // Plataformas inamovibles por el jugador
        this.platform.setImmovable(true);
        this.platform2.setImmovable(true);
        this.platform3.setImmovable(true);

        //Colisión con el jugador
        this.physics.add.collider(this.player, [this.platform, this.platform2, this.platform3]);


        //
        this.cursors = this.input.keyboard.createCursorKeys();


    }

    update() {
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-260);
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(260);
        } else {
            this.player.setVelocityX(0);
        }





    }
}