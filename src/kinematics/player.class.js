
import { Kinematic } from '../core/kinematic.class.js';
import { HealthBar } from '../ui/healthBar.class.js';
import { Sounds } from '../common/sounds.class.js';
import { Rocket } from './rocket.class.js';
import { Ship } from './ship.class.js';


export class Player extends Ship {
    #rockets = [];
    #maxRockts = 6;
    #healthBar;
    constructor(_canvas, _color, _x, _y, _life) {
        super(_canvas, _color, _x, _y, _life);
        this.#healthBar = new HealthBar(_canvas, 10, 60, (this.canvas.width * 0.2), 8, this.health);
    }
    reset() {
        this.#rockets = [];
        super.reset();
    }
    render() {
        this.#rockets.forEach(rockt => {
            rockt.move();
            rockt.render();
        });
        this.#healthBar.render();
        this.#rockets = this.#rockets.filter(rockt => rockt.x < canvas.width && !rockt.isDestroy());
        super.render();
    }
    fire() {
        if (this.#rockets.length >= this.#maxRockts) return;
        const rockt = new Rocket(canvas, 'gray', this.x + 5, this.y + 15);
        rockt.vector.setVector(15, 0);
        this.#rockets.push(rockt)
    }
    isShootedEnemy(enemy) {
        for (const rockt of this.#rockets) {
            if (rockt.isShooted(enemy)) {
                enemy.reduceHealth(1);
                if (enemy.health.current <= 0) {
                    enemy.destroy();
                }
                return true;
            }
        }
        return false;
    }
    reduceHealth(value){
        Sounds.shoot2();
        super.reduceHealth(value);
    }
    get rockets() { return this.#rockets; }

}