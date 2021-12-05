import { Kinematic } from '../core/kinematic.class.js';
import { Sounds } from '../common/sounds.class.js';
import { LayerPath } from '../core/layerPath.class.js';

export class Rocket extends Kinematic {
    #primaryColor;
    constructor(canvas, color, x, y) {
        Sounds.shoot()
        super(canvas, x , y, 30, 10);
        this.#primaryColor = color;
        this.initLayer();
    }
    initLayer() {
        const shoot = new Path2D();
        const center = 5;
        shoot.moveTo(0, center-2);
        shoot.lineTo(20, center-2);
        shoot.lineTo(25, center);
        shoot.lineTo(20, center+2);
        shoot.lineTo(0, center+2);
        shoot.lineTo(0, center-2);
        shoot.closePath();
            /*
        shoot.rect(0, center-2, 20, 4); // Gun
        shoot.rect(5, center-7.5, 2, 15);// Fly
        shoot.rect(0, center-7.5, 3, 15);// Fly
        */
        const flame = new Path2D();
        flame.ellipse(0, center, 10,  4, 0, 0,Math.PI*2); // llama
        
        const flame2 = new Path2D();
        flame2.ellipse(2, center, 8,  2, 0, 0,Math.PI*2); // llama

        super.setLeyers([ new LayerPath(shoot, this.#primaryColor, this), new LayerPath(flame, 'red', this), new LayerPath(flame2, 'yellow', this)]);
    }

    isShooted(element){
        if(this.hasColision(element)){
            Sounds.explosion();
            this.destroy();
            return true;
        }
        return false;
    }

}   
