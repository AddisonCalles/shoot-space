import { Kinematic } from '../common/kinematic.class.js';
import { Health } from '../common/health.class.js';
import { LayerPath } from '../common/layerPath.class.js';
export class Ship2 extends Kinematic {
    #color;
    #health;
    constructor(_canvas, _color, _x, _y, _health) {
        super(_canvas, _x, _y, 30, 30);
        this.#health = new Health(_health);
        this.#color = _color;
        this.offset = { x: this.width / 2, y: this.height / 2 };
        this.initLeyers();
    }
    reset() {
        this.#health.reset();
    }

    initLeyers() {
        const path1 = new Path2D();
        path1.arc(6, this.offset.y + 1, 6, 0, 2 * Math.PI); // llama
        path1.rect(6, this.offset.y - 4.5, 20, 4); // Gun
        path1.rect(6, this.offset.y + 2.0, 20, 4); // Gun
        path1.rect(6, this.offset.y - 7.5, 10, 15); //Body
        path1.rect(6 + 5, 0, 2, this.offset.y * 2); // Fly
        path1.rect(6, 0, 3, this.offset.y * 2); // Fly

        const layer1 = new LayerPath(path1, this.#color, this);
        super.setLeyers([layer1]);
    }

    get health() { return this.#health; }
}