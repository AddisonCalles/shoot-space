import { Drawable } from "../core/drawable.class.js";
import { EventListener } from "../core/eventListener.class.js";
import { Sounds } from "../common/sounds.class.js";
import { Health } from "../common/health.class.js";

export class HealthBar extends Drawable {
    #health = new Health();

    constructor(canvas, x, y, width, height, health) {
        super(canvas, x, y, width, height)
        this.#health = health;
    }
    render(background = 'grey', color = 'green'){
        const unitWidth = this.width / this.#health.total;
        const widthLife = this.#health.current * unitWidth;
        const border = parseInt(0.2 * this.height);
        this.context.strokeStyle = background;
        this.context.fillStyle = color;
        this.context.strokeRect(this.x, this.y, this.width + (border * 2), this.height + (border * 2));
        this.context.fillRect(this.x + border, this.y + border, widthLife, this.height);
    }
    get health() { return this.#health; }
}