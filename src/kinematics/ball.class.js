import { KinematicObject } from '../core/kinematicObject.class.js';

export class Ball extends KinematicObject {
    #r = 5;
    #color;
    #path = new Path2D();
    constructor(canvas, color, x, y) {
        super(canvas, x, y, 30, 30);
        this.#color = color;
        this.initPath();
    }

    get r() { return this.#r; }
    initPath(){
        this.path.arc(0, -4, this.#r, 0, 2 * Math.PI);
        this.path.arc(0, 4, this.#r, 0, 2 * Math.PI);
        this.path.rect(2, -2, 30,5);
    }
    render() {
        super.render(this.#path, this.#color);
    }

}