import { RestartButton } from "../componentes/RestartButton";

export class Gameover extends Phaser.Scene {
    constructor() {
        super({ key: 'gameover' });
        this.startButton = new RestartButton(this);
    }
}