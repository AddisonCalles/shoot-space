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
    
    rotateTo(element1){
        this.setDir(-180);
    }

    setVector(_vel, _dir) {
        this.#vel = Math.abs(_vel);
        this.#dir = _dir;
        const radians = _dir * Math.PI / 180;
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