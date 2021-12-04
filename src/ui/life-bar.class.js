export class LifeBar {
    #life;
    #total;
    #canvas;
    constructor(canvas, x, y, total){
        this.#total = total;
        this.#life = total;
        this.#canvas = canvas;
        this.x = x;
        this.y = y;
    }
    render(){
        const ctx = this.#canvas.getContext('2d');
        const width = (this.#canvas.width * 0.2);
        const unitWidth = width / this.#total;
        const widthLife = this.#life * unitWidth;
        const border = 2;
        const heigth = 6;
        ctx.strokeStyle='grey';
        ctx.fillStyle='green';
        ctx.strokeRect(this.x, this.y, width + (border * 2 ), heigth + (border * 2 ));
        ctx.fillRect(this.x+border, this.y+border, widthLife, heigth);

        
    }

    reduce(reduce){
        const life = this.#life - reduce;
        this.#life = (life < 0)? 0 : life;
    }

    get life(){ return this.#life; }
}