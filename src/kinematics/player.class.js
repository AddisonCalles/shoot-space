
import { KinematicObject } from '../core/kinematicObject.class.js';
import { LifeBar } from '../ui/life-bar.class.js';
import { Sounds } from '../ui/sounds.class.js';
import { Shoot } from './shoot.class.js';
export const playerPath = new Path2D();
const center = 15;
playerPath.arc(0, center, 6, 0, 2 * Math.PI); // llama
playerPath.rect(0, center - 4.5 - 2, 20, 4); // Gun
//playerPath.rect(0, center-2, 20, 4); // Gun
playerPath.rect(0, center + 4.5 - 2, 20, 4); // Gun
playerPath.rect(0, center - 7.5, 10, 15); //Body
playerPath.rect(5, center - 15, 2, 30); // Fly
playerPath.rect(0, center - 15, 3, 30); // Fly

export class Player extends KinematicObject {
    #shoots = [];
    #color;
    #maxShoots = 6;
    #lifeBar;
    #enableLifeBar;
    constructor(canvas, color, x, y, life, enableLifeBar = true) {
        super(canvas, 30, x, y);
        this.#enableLifeBar = enableLifeBar;
        this.#lifeBar = new LifeBar(canvas, 10, 60, life);
        this.#color = color;
    }
    render() {
        this.#shoots.forEach(shoot => {
            shoot.move();
            shoot.render();
        });
        if(this.#enableLifeBar) this.#lifeBar.render();
        this.#shoots = this.#shoots.filter(shoot => shoot.x < canvas.width && !shoot.isDestroy());
        super.render(playerPath, this.#color);
    }
    shoot() {
        if (this.#shoots.length >= this.#maxShoots) return;
        Sounds.shoot()
        const shoot = new Shoot(canvas, 'orange', this.x + 5, this.y + (this.#shoots.length % 2 == 0 ? 0 : 15));
        shoot.vector.setVector(15, 0);
        this.#shoots.push(shoot)
    }
    isShootEnemy(enemy) {
        for (const shoot of this.#shoots) {
            if (shoot.isShoot(enemy)) {
                return true;
            }
        }
        return false;
    }
    reduceLife(cant){
        this.#lifeBar.reduce(cant);
    }
    get lifeBar(){ return this.#lifeBar; }
    get shoots() { return this.#shoots; }

}