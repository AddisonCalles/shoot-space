import { Player } from './player.class.js';

export class Enemy extends Player {

    constructor(canvas, width, x, y) {
        super(canvas, width, x, y, 1, false);
    }


}