export class Vector {
    #vel;
    #dir;
    #velX;
    #velY;
    constructor() {
        this.#velX = 0;
        this.#velY = 0;
    }

    setVel(vel) {
        this.setVector(vel, this.#dir);
    }
    setDir(dir) {
        this.setVector(this.#vel, dir);
    }
    rotate(grades) {
        const sum = this.#dir + grades;
        this.#dir = sum % 360;
        this.setVector(this.#vel, this.#dir);
    }
    setVector(vel, dir) {
        this.#vel = Math.abs(vel);
        this.#dir = dir;
        const radians = dir * Math.PI / 180;
        this.#velX = (this.#vel * Math.cos(radians));
        this.#velY = (this.#vel * Math.sin(radians));
    }

    setVelXY(velx, vely) {
        this.#velX = velx;
        this.#velY = vely;
        this.#vel = Math.abs(((this.#velX ** 2) + (this.#velY ** 2)) ** 1 / 2);
        this.#dir = Math.atan(this.#velY / this.#velX);
    }
    get vel() { return { vel: this.#vel, x: this.#velX, y: this.#velY }; }

    get dir() { return this.#dir }

}