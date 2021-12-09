import { math } from '../../../node_modules/streetzero/dist/streetzero.esm.js';
import { Sounds } from '../../resources/sounds.class.js';
import { SpaceShipV2Drawing } from '../../drawings/space-ship-v2.drawing.js';
import { Enemy } from './enemy.class.js';

export const EnemyLevels = {
    level1: {
        color: '#d32f2f',
        health: 1,
        velocity: 1,
    },
    level2: {
        color: '#bc5100',
        health: 2,
        velocity: 1.25,
    },
    level3: {
        color: '#4a148c',
        health: 3,
        velocity: 1.5,
    }
}

export class SmallShip extends Enemy {
    #evilMode;
    #evilModeTimer;
    #color;
    constructor(canvas, level, x, y, player) {
        super(canvas, x, y, 30, 40, level.health, player);
        super.centerOffset();
        this.#color = level.color;
        this.#initEvilMode();
        super.setLeyers(SpaceShipV2Drawing(this.#color, this));
    }

    #initEvilMode(){
        this.#evilModeTimer = parseInt(math.random(25000, 5000));
        this.#evilMode = setTimeout(()=>{
                this.vector.rotateTo(this.player);
                this.#initEvilMode();
        }, this.#evilModeTimer)
    }
    
    move(){
        if(super.edgeColision()){
            this.vector.rotate(60);
        }
        super.move();
    }
    destroy(){
        try {
            clearInterval(this.#evilMode);
        } catch (error) {
            
        }
        super.destroy();
    }
}