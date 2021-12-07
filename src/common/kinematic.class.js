import { Drawable } from './drawable.class.js';
import { Vector } from './vector.class.js';

export class Kinematic extends Drawable {
    #destroy = false;
    #path;
    #vector = new Vector(this);
    #enabledVectorRotation = true;
    constructor(_canvas, _x, _y, _width = 0, _height = 0) {
        super(_canvas, _x, _y, _width, _height)
        this.#path = new Path2D();
        this.#vector.setVector(0, 0);
    }

    edgeColision() {
        if ((this.x <= 0) && this.#vector.vel.x < 0) {
            return 'right';
        } else if (this.x2 >= this.canvas.width && this.#vector.vel.x > 0) {
            return 'left';
        }

        if ((this.y <= 0) && this.#vector.vel.y < 0) {
            return 'top';
        } else if (this.y2 >= (this.canvas.height) && this.#vector.vel.y > 0) {
            return 'bottom';
        }

        return false;
    }
    hasColision(el) {
        let xColision = false;
        if (this.x <= el.x2 && el.x <= this.x2) {
            xColision = true;
        } else if (this.x2 >= el.x && this.x2 <= el.x2) {
            xColision = true;
        }

        let yColision = false;
        if (this.y <= el.y2 && el.y <= this.y2) {
            yColision = true;
        } else if (this.y2 >= el.y && this.y2 <= el.y2) {
            yColision = true;
        }

        return (xColision && yColision);
        /* V1-BETA COLISION:  for (let xp = 0; xp < el.width; xp += 2) {
              if (this.context.isPointInPath(this.path, parseInt(el.x + xp), parseInt(el.y + xp))) return true;
          }
          for (let xp = 0; xp < el.width; xp += 2) {
              if (this.context.isPointInPath(this.path, parseInt((el.x + el.width) - xp), parseInt(el.y + xp))) return true;
          }*/
        //return false;
    }
    move() {
        super.move(this.#vector.vel.x, this.#vector.vel.y);
    }
    isDestroy() { return this.#destroy; }
    destroy() { this.#destroy = true; }
    get vector() {
        return this.#vector;
    }
    get path() { return this.#path; }
    set enabledVectorRotation(value) { this.#enabledVectorRotation = value; }
    get enabledVectorRotation() { return this.#enabledVectorRotation; }
}