
import { KinematicObject } from '../core/kinematicObject.class.js';
import { HealthBar } from '../ui/healthBar.class.js';
import { Sounds } from '../common/sounds.class.js';
import { Shoot } from './shoot.class.js';
import { Ship } from './ship.class.js';


export class Player extends Ship {
    #shoots = [];
    #maxShoots = 6;
    #healthBar;
    constructor(_canvas, _color, _x, _y, _life) {
        super(_canvas, _color, _x, _y, _life);
        this.#healthBar = new HealthBar(_canvas, 10, 60, (this.canvas.width * 0.2), 8, this.health);
    }
    reset() {
        this.#shoots = [];
        super.reset();
    }
    render() {
        this.#shoots.forEach(shoot => {
            shoot.move();
            shoot.render();
        });
        this.#healthBar.render();
        this.#shoots = this.#shoots.filter(shoot => shoot.x < canvas.width && !shoot.isDestroy());
        super.render();
    }
    shoot() {
        if (this.#shoots.length >= this.#maxShoots) return;
        const shoot = new Shoot(canvas, 'orange', this.x + 5, this.y + 15);
        shoot.vector.setVector(15, 0);
        this.#shoots.push(shoot)
    }
    isShootEnemy(enemy) {
        for (const shoot of this.#shoots) {
            if (shoot.isShoot(enemy)) {
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
    get shoots() { return this.#shoots; }

}