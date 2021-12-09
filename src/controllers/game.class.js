import { SmallShip, EnemyLevels } from "../kinematics/enemies/smallShip.class.js";
import { Sounds } from "../resources/sounds.class.js";
import { Player } from "../kinematics/player.class.js";
import { Colors } from "../ui/colors.js";
import { QueenShipV1 } from "../kinematics/enemies/queenshipv1.class.js";
import { math, EventListener } from '../../node_modules/streetzero/dist/streetzero.esm.js';

export class Game {
    #play = false;
    #level = 0;
    #player;
    #context;
    #points = 0;
    #enemies = [];
    #canvas;
    #levelText = "";
    #gameover = false;
    #playEvent = new EventListener();
    #gameOverEvent = new EventListener();
    #nextLevelEvent = new EventListener();
    #queen;
    #queenLevel = 25;
    #resetText = `Press click to reset...`;
    #secondsToReset = 3;
    constructor(canvas) {
        this.#canvas = canvas;
        this.#context = canvas.getContext('2d');
        this.#player = new Player(canvas, '#4f83cc', 20, 50, 15);    
        this.#player.health.deadEvent.subscribe(()=>{
            this.#gameover = true;
        })    
        this.#initMouseEvents();
    }

    render() {

        if (this.#gameover) {
            this.#gameOverScreen()
            return;
        }
        this.#context.fillStyle = Colors.background;
        this.#context.fillRect(0, 0, this.#canvas.width, this.#canvas.height);
        
        if (this.isPlay) {
            if(this.#queen) this.renderQueen();
            this.#player.render();
            this.renderEnemies();
            if (this.#gameover ) {
                this.#gameOverExecute();
            }
            if (this.#levelText != '') {
                this.#context.font = "20px Arial";
                this.#context.fillStyle = Colors.title;
                this.#context.fillText(this.#levelText, (this.#canvas.width / 2) - 25, this.#canvas.height / 2);
                this.#context.font = "10px Arial";
                this.#context.fillText('Created by Addison Calles', (this.#canvas.width / 2) - 50, (this.#canvas.height / 2) + 20);
            }
        }
    }
    #initMouseEvents() {
        const gameRef = this;
        this.#canvas.addEventListener('click', function (event) {
            if (!gameRef.isPlay) {
                gameRef.play();
            } else if (gameRef.gameOver) {
                gameRef.reset();
            } else {
                gameRef.player.fire();
            }
        });
        this.#canvas.addEventListener('mousemove', function (event) {
            gameRef.player.setPos(10, event.offsetY - gameRef.player.height);
        });
    }
    play() {
        this.#play = true;
    }
    #gameOverExecute() {
        this.gameOverEvent.emit(this.#level);
        Sounds.gameOver();
    }
    renderEnemies() {
        this.#enemies.forEach(enemy => {
            if (!enemy.health.isDead) {
                enemy.move();
                if (this.#player.isShootedEnemy(enemy)) {
                    this.#points++;
                } else if (this.#player.hasColision(enemy)) {
                    enemy.destroy();
                    this.#player.health.reduce(1);
                } else {
                    enemy.render();
                }
            }
        });
        this.#enemies = this.#enemies.filter(enemy => !enemy.isDestroy());
        if(this.#level % this.#queenLevel == 0 && this.#queen){
            //Is Queen level
        }
        else if (this.#enemies.length == 0 && this.#levelText == '') {
            Sounds.explosionEnd();
            this.nextLevel();
        }
    }
    reset() {
        setInterval(() => {
            if(this.#secondsToReset == 0){
                document.location.reload();
            }
            this.#resetText = `Reset in ${this.#secondsToReset} seconds...`;
            this.#secondsToReset--;
        },  1000);
    }
    nextLevel() {
        this.#level++;
       
        this.#levelText = `Level ${this.#level}`;

        setTimeout(() => {
            this.#levelText = ``;
            if(this.#level % this.#queenLevel==0){
                this.#enemies.push(new QueenShipV1(canvas, this.#player));
            }
            this.#addEnemies(this.#level);
        }, 3000);
    }
    #gameOverScreen() {
        this.#context.font = "40px Arial";
        this.#context.fillStyle = 'gray';
        this.#context.fillText(`Game Over`, (this.#canvas.width / 2) - 100, this.#canvas.height / 2);
        this.#context.font = "18px Arial";
        this.#context.fillText(this.#resetText, (this.#canvas.width / 2) - 100, (this.#canvas.height / 2) + 35);
    }
    #addEnemies(count) {
        for (let index = 0; index < count; index++) {
            let levelEnemy = EnemyLevels.level1;
            if (index < 10) {
            } else if (index % 10 == 0) {
                levelEnemy = EnemyLevels.level2;
            } else if (index % 6 == 0) {
                levelEnemy = EnemyLevels.level3;
            }
            const enemy = new SmallShip(this.#canvas, levelEnemy, (this.#canvas.width - 100), math.random(this.#canvas.height, 5), this.#player);
            enemy.vector.setVector(1.5 + (this.#level / 5), math.random(270, 90));
            this.#enemies.push(enemy)
        }
    }
    get gameOverEvent() { return this.#gameOverEvent; }
    get nextLevelEvent() { return this.#nextLevelEvent; }
    get playEvent() { return this.#playEvent; }
    get gameOver() { return this.#gameover; }
    get points() { return this.#points; }
    get level() { return this.#level; }
    get enemies() { return this.#enemies; }
    get player() { return this.#player; }
    get isPlay() { return this.#play; }
}