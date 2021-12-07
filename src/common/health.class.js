import { EventListener } from "../common/eventListener.class.js";

export class Health {
    #health;
    #total;
    #reduceEvent = new EventListener();
    #deadEvent = new EventListener();

    constructor(total) {
        this.#total = total;
        this.#health = total;
    }

    reset() {
        this.#health = this.#total;
    }

    reduce(reduce) {
        const health = this.#health - reduce;
        if (health <= 0) {
            this.#health = 0;
            this.deadEvent.emit(this);
        } else {
            this.#health = health;
        }
    }

    get current() { return this.#health; }
    get total() { return this.#total; }
    get reduceEvent() { return this.#reduceEvent; }
    get deadEvent() { return this.#deadEvent; }
    get isDead() { return this.current <= 0; }
}