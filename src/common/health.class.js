import { EventListener } from "../core/eventListener.class.js";

export class Health {
    #health;
    #total;

    #reduceEvent = new EventListener();

    constructor(total) {
        this.#total = total;
        this.#health = total;
    }

    reset() {
        this.#health = this.#total;
    }

    reduce(reduce) {

        const health = this.#health - reduce;
        this.#health = (health < 0) ? 0 : health;
    }

    get current() { return this.#health; }
    get total() { return this.#total; }

    get reduceEvent() { return this.#reduceEvent; }
}