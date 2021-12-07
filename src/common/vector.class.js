import { angleBetweenPoints, vectorByXY, vectorComponents } from './helpers/math.js';

export class Vector {
    #vel =0;
    #dir = 0;
    #velX = 0;
    #velY = 0;
    #element;
    constructor(element) {
        this.#element = element;
    }

    setVel(_vel) {
        this.setVector(_vel, this.#dir);
    }
    setDir(_dir) {
        this.setVector(this.#vel, _dir);
    }
    rotate(grades) {
        const sum = this.#dir + grades;
        this.#dir = sum % 360;
        this.setVector(this.#vel, this.#dir);
    }
    
    rotateTo(element){
        const angleBetweenElements = angleBetweenPoints(this.#element, element);
        this.setDir(angleBetweenElements);
    }

    setVector(_vel, _dir) {
        this.#vel = Math.abs(_vel);
        this.#dir = _dir;
        const components = vectorComponents(this.#dir, this.#vel);
        this.#velX = components.x;
        this.#velY = components.y;
    }

    setVelXY(velx, vely) {
        this.#velX = velx;
        this.#velY = vely;
        const vector = vectorByXY(velx, vely);
        this.#vel = vector.vel;
        this.#dir = vector.dir;
    }

    get vel() { return { vel: this.#vel, x: this.#velX, y: this.#velY }; }

    get dir() { return this.#dir }

}