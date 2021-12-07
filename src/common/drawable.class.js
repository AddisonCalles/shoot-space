import { Configs } from '../../config.js';
export class Drawable {
    #ctx;
    #offset = {x: 0, y: 0};
    #canvas;
    #layers = [];
    #x;
    #y;
    #width;
    #height;
    #rotation = 0;
    constructor(_canvas, _x, _y, _width = 0, _height = 0) {
        this.#width = parseInt(_width);
        this.#height = parseInt(_height);
        this.#x = _x;
        this.#y = _y;
        this.#ctx = _canvas.getContext('2d');
        this.#canvas = _canvas;
    }
    setLeyers(layers){
        this.#layers = layers;
    }
    move(_x, _y){
        this.#x += _x;
        this.#y += _y;
    }
    rotate(angle){
        this.#rotation = this.#rotation + angle;
    }
    setPos(_x, _y) {
        this.#x = _x;
        this.#y = _y;
    }

    setCanvas(canvas) {
        this.#canvas = canvas;
        this.#ctx = this.#canvas.getContext('2d');
    }
    centerOffset(){
        this.#offset = { x: this.width / 2, y: this.height / 2 };
    }
    render() {
        this.#layers.forEach((layer)=>{
                layer.render();
        });
        if(Configs.debugMode) {
            this.context.fillStyle = 'orange';
            this.context.font = "10px Arial";
            this.context.fillText(`(${parseInt(this.x)},${parseInt(this.y)})`,this.x -10, this.y-10);
            this.context.strokeStyle = 'gray';
            this.context.strokeRect(this.x, this.y, this.width, this.height);
            this.context.beginPath();
            this.context.arc(this.x, this.y, 4, 0, Math.PI*2);
            this.context.fill();
        }
    }
    get context() { return this.#ctx; }
    get canvas() { return this.#canvas; }
    get x() { return this.#x + this.#offset.x; }
    get y() { return this.#y + this.#offset.y;}
    get x2() { return this.x + this.#width; }
    get y2() { return this.y + this.#height; }
    get rotation(){return this.#rotation;}
    get width() { return this.#width; }
    get height() { return this.#height; }
    get offset(){ return this.#offset; }
    set offset(value) { this.#offset = value; }
    set rotation(value) { this.#rotation = value; }

}