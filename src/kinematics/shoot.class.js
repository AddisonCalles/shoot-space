import { KinematicObject } from '../core/kinematicObject.class.js';
import { Sounds } from '../common/sounds.class.js';
export const shootPath = new Path2D();
const center = 5;
shootPath.arc(0, center, 4, 0, 2 * Math.PI); // llama
shootPath.rect(0, center-2, 20, 4); // Gun
shootPath.rect(5, center-7.5, 2, 15);// Fly
shootPath.rect(0, center-7.5, 3, 15);// Fly

export class Shoot extends KinematicObject {
    #color;
    constructor(canvas, color, x, y) {
        Sounds.shoot()
        super(canvas, x , y, 30, 10);
        this.#color = color;
    }
    render() {
        super.render(shootPath, this.#color);
    }

    isShoot(element){
        if(this.hasColision(element)){
            Sounds.explosion();
            this.destroy();
            return true;
        }
        return false;
    }

}   
