import { Enemy } from "./kinematics/enemy.class.js";
import { random } from "./helpers.js";
import { Player } from "./kinematics/player.class.js";
import { Sounds } from "./ui/sounds.class.js";
import { Colors } from "./ui/colors.js";


export class Game {

    #level = 0;
    #player;
    #context;
    #points = 0;
    #enemies = [];

    #canvas;
    #levelText = "";
    #gameofver = false;
    constructor(canvas) {
        this.#canvas = canvas;
        this.#context = canvas.getContext('2d');
        this.#player = new Player(canvas, '#4f83cc', 20, 50, 100);
    }

    render() {
        this.#player.render();
        this.renderEnemies();

        if(this.#player.lifeBar.life <= 0){
            this.#gameofver = true;
        }
    }

    renderEnemies() {
        if (this.#enemies.length == 0 && this.#levelText == '') {
            this.nextLevel();
        }
        this.#enemies = this.#enemies.filter(enemy => !enemy.isDestroy());
        this.#enemies.forEach(enemy => {
            if (!enemy.dead) {
                enemy.colisionDetect();
                enemy.move();
                if (this.#player.isShootEnemy(enemy)) {
                    if(this.#enemies.length == 1) {
                        Sounds.explosionEnd();
                    }else{
                        Sounds.explosion();
                    }
                    this.#points++;
                    enemy.destroy();
                } else if(this.#player.hasColision(enemy)){
                    enemy.destroy();
                    this.#player.reduceLife(20);
                }else{
                    enemy.render();
                }
            }
        });
        if(this.#levelText != ''){
            this.#context.font = "20px Arial";
            this.#context.fillStyle = Colors.title;
            this.#context.fillText(this.#levelText, (this.#canvas.width/2) -25, this.#canvas.height/2);
            this.#context.font = "10px Arial";
            this.#context.fillText('Created by Addison Calles', (this.#canvas.width/2) - 50, (this.#canvas.height/2) +20 );
        }
        
    }

    nextLevel() {
        this.#level++;
        this.#levelText = `Level ${this.#level}`;
        setTimeout(()=>
        {
            this.#levelText = ``;
            this.#addEnemies(this.#level);
        }, 3000);
    }

    #addEnemies(count) {
        for (let index = 0; index < count; index++) {
            const enemy = new Enemy(this.#canvas, 'red', (this.#canvas.width - 30), random(this.#canvas.height, 10));
            enemy.vector.setVector(1.5 + (this.#level/5), random(180, 5));
            this.#enemies.push(enemy)
        }
    }
    get gameOver(){ return this.#gameofver; }
    get points() { return this.#points; }
    get level() { return this.#level; }
    get enemies() { return this.#enemies; }
    get player() { return this.#player; }
}