import { Kinematic } from '../core/kinematic.class.js';
import { Health } from '../common/health.class.js';
import { LayerPath } from '../core/layerPath.class.js';
import { SpaceShipV2 } from '../drawings/spaceShipV2.js';
export class Ship extends Kinematic {
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
        const shipPathLayers = SpaceShipV2(this.#color, this);
        super.setLeyers(shipPathLayers);
    }

    reduceHealth(cant) {
        this.#health.reduce(cant);
    }
    get health() { return this.#health; }
}