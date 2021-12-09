import { Health, Kinematic } from '../../../node_modules/streetzero/dist/streetzero.esm.js';
import { Colors } from '../../ui/colors.js';
import { HealthBar } from '../../ui/healthBar.class.js';

export class Enemy extends Kinematic {
    #player;
    #healthBar;
    #health;
    constructor(canvas, x, y, width, height, _health, player) {
        super(canvas, x, y, width, height);
        super.centerOffset();
        this.#health = new Health(_health);
        this.#healthBar = new HealthBar(canvas, x, y + this.height+5, this.width, 1, this.health );
        this.#player = player;
    }

    render(){
        this.#healthBar.setPos(this.x,this.y + this.height+5);
        this.#healthBar.render(Colors.background, '#76ff03');
        super.render();
    }
    get health() { return this.#health;}
    get player() { return this.#player; }
}