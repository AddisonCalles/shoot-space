import { Enemy, EnemyLevels } from "../kinematics/enemy.class.js";
import { random } from "../common/helpers.js";
import { Sounds } from "../common/sounds.class.js";
import { Player } from "../kinematics/player.class.js";
import { Colors } from "../ui/colors.js";
import { EventListener } from "../core/eventListener.class.js";


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
    constructor(canvas) {
        this.#canvas = canvas;
        this.#context = canvas.getContext('2d');
        this.#player = new Player(canvas, '#4f83cc', 20, 50, 100);
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
            this.#player.render();
            this.renderEnemies();
            if (!this.#gameover && this.#player.health.current <= 0) {
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
        this.#gameover = true;
        this.gameOverEvent.emit(this.#level);
        Sounds.gameOver();
    }
    renderEnemies() {

        this.#enemies.forEach(enemy => {
            if (!enemy.dead) {
                enemy.colisionDetect();
                enemy.move();
                if (this.#player.isShootedEnemy(enemy)) {
                    if (this.#enemies.length == 1) {
                        Sounds.explosionEnd();
                    }
                    this.#points++;
                } else if (this.#player.hasColision(enemy)) {
                    enemy.destroy();
                    this.#player.reduceHealth(20);
                } else {
                    enemy.render();
                }
            }
        });
        this.#enemies = this.#enemies.filter(enemy => !enemy.isDestroy());
        if (this.#enemies.length == 0 && this.#levelText == '') {
            this.nextLevel();
        }
    }
    reset() {
        setTimeout(() => {
            this.#enemies = [];
            this.#points = 0;
            this.#level = 0;
            this.#player.reset();
            this.#gameover = false;
        },  3000);
    }
    nextLevel() {
        this.#level++;
        this.#levelText = `Level ${this.#level}`;

        setTimeout(() => {
            this.#levelText = ``;
            this.#addEnemies(this.#level);
        }, 3000);
    }

    #gameOverScreen() {
        this.#context.font = "40px Arial";
        this.#context.fillStyle = 'gray';
        this.#context.fillText(`Game Over`, (this.#canvas.width / 2) - 100, this.#canvas.height / 2);
        this.#context.font = "18px Arial";
        this.#context.fillText(`Press click to reset...`, (this.#canvas.width / 2) - 100, (this.#canvas.height / 2) + 35);
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
            const enemy = new Enemy(this.#canvas, levelEnemy, (this.#canvas.width - 100), random(this.#canvas.height, 5));
            enemy.vector.setVector(1.5 + (this.#level / 5), random(270, 90));
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
    get isPlay() {
        return this.#play;
    }

}