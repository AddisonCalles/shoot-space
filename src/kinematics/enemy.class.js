import { random } from '../common/helpers.js';
import { Sounds } from '../common/sounds.class.js';
import { Colors } from '../ui/colors.js';
import { HealthBar } from '../ui/healthBar.class.js';
import { Ship } from './ship.class.js';


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

export class Enemy extends Ship {
    #player;
    #evilMode;
    #evilModeTimer;
    #healthBar;
    constructor(canvas, level, x, y, player) {
        super(canvas, level.color, x, y, level.health);
        this.#healthBar = new HealthBar(canvas, x, y + this.height+5, this.width, 1, this.health );
        this.#player = player;
        this.initEvilMode();
    }

    render(){
        this.#healthBar.setPos(this.x,this.y + this.height+5);
        this.#healthBar.render(Colors.background, '#76ff03');
        super.render();
    }

    move(){
        super.move();
    }

    initEvilMode(){
        this.#evilModeTimer = parseInt(random(20000, 5000));
        this.#evilMode = setTimeout(()=>{
                this.vector.rotateTo(this.#player);
        }, this.#evilModeTimer)
    }
    
    destroy(){
        try {
            clearInterval(this.#evilMode);
        } catch (error) {
            
        }
        super.destroy();
    }
}