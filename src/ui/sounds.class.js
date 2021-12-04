const path = 'assets/sounds/';

export class Sounds {
    static get volume() { return 0.8; };
    static shoot() {
        this.play('shoot', 0.75);
    }

    static explosion() {
        this.play('explosion', 1);
    }

    static explosionEnd() {
        this.play('explosion-final', 0.8);
    }

    static play(name, v) {
        const sound = new Audio(`${path}${name}.mp3`);
        sound.volume = this.volume * v;
        sound.play();
    }
}