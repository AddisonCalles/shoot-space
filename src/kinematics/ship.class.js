import { KinematicObject } from '../core/kinematicObject.class.js';
import { Health } from '../common/health.class.js';
export class Ship extends KinematicObject {
    #color;
    #health;
    #playerPath = new Path2D();
    constructor(_canvas, _color, _x, _y, _health) {
        super(_canvas, _x, _y, 30, 30);
        this.#health = new Health(_health);
        this.#color = _color;
        this.offset = { x: this.width / 2, y: this.height / 2 };
        this.initPath()
    }
    reset() {
        this.#health.reset();
    }

    initPath() {
        this.#playerPath.arc(6, this.offset.y + 1, 6, 0, 2 * Math.PI); // llama
        this.#playerPath.rect(6, this.offset.y - 4.5, 20, 4); // Gun
        this.#playerPath.rect(6, this.offset.y + 2.0, 20, 4); // Gun
        this.#playerPath.rect(6, this.offset.y - 7.5, 10, 15); //Body
        this.#playerPath.rect(6 + 5, 0, 2, this.offset.y * 2); // Fly
        this.#playerPath.rect(6, 0, 3, this.offset.y * 2); // Fly
    }

    render() {
        super.render(this.#playerPath, this.#color);
    }
    reduceHealth(cant) {
        this.#health.reduce(cant);
    }
    get health() { return this.#health; }
}