import { Vector } from './vector.class.js';

export class KinematicObject {
    #destroy = false;
    #ctx;
    #canvas;
    #path;
    #pathColider;
    #x;
    #y;
    #width;
    #vector = new Vector();
    constructor(canvas, width = 0, x, y) {
        this.#width = width;
        this.#ctx = canvas.getContext('2d');
        this.#canvas = canvas;
        this.#path = new Path2D();
        this.#x = x;
        this.#y = y;
        this.#vector.setDir(0);
    }

    colisionDetect() {
        if ((this.#x <= (this.#width / 2)) && this.#vector.vel.x < 0) {
            this.#vector.rotate(60);
        } else if (this.#x >= (this.#canvas.width - this.#width) && this.#vector.vel.x >0) {
            this.#vector.rotate(60);
        }

        if (this.#y <= (this.#width / 2) && this.#vector.vel.y <0) {
            this.#vector.rotate(60);
        } else if (this.#y >= (this.#canvas.height - this.#width) && this.#vector.vel.y >0){
            this.#vector.rotate(60);
        }
    }
    hasColision(el){
        for (let xp = 0; xp < el.width; xp+=2) {
            if(this.context.isPointInPath(this.path, parseInt(el.x + xp), parseInt(el.y  + xp))) return true;
        }
        for (let xp = 0; xp < el.width; xp+=2) {
            if(this.context.isPointInPath(this.path, parseInt((el.x + el.width) - xp), parseInt(el.y  + xp))) return true;
        }
        return false;
    }
    move() {
        this.setPos(this.#x + this.#vector.vel.x, this.#y + this.#vector.vel.y);
    }
    setPos(_x, _y) {
        this.#x = _x;
        this.#y = _y;
    }
    setPath(path) {
        this.#path = path;
    }
    setCanvas(canvas) {
        this.#canvas = canvas;
        this.#ctx = this.#canvas.getContext('2d');
    }
    render(path, fillColor) {
        this.#ctx.fillStyle = fillColor;
        this.#pathColider = path;
        this.#path = new Path2D();
        this.#path.addPath(path, DOMMatrix.fromMatrix().translate(this.#x, this.#y).rotateSelf(this.#vector.dir));
        this.#ctx.fill(this.#path);
    }
    isDestroy(){ return this.#destroy; }
    destroy() { this.#destroy = true; }
    get vector() {
        return this.#vector;
    }
    get path(){ return this.#path;}
    get context() { return this.#ctx; }
    get canvas() { return this.#canvas; }
    get x() { return this.#x; }
    get y() { return this.#y; }
    get width() { return this.#width; }
    

}