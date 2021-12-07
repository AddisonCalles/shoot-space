import { SmallShip, EnemyLevels } from "../kinematics/enemies/smallShip.class.js";
import { Player } from "../kinematics/player.class.js";


export class TestGame {
    #play = false;
    #level = 0;
    #player;
    #context;
    #points = 0;
    #enemies = [];

    #rotateLoop;
    #canvas;
    #levelText = "";
    #gameofver = false;
    constructor(canvas) {
        this.#canvas = canvas;
        this.#context = canvas.getContext('2d');
        this.#player = new Player(canvas, '#4f83cc', 20, 50, 100);

        const enemy = new SmallShip(canvas, EnemyLevels.level1, 20, 20, this.#player);
        enemy.vector.setVector(1, 90);
        /*this.#rotateLoop = setInterval(()=>{
            enemy.vector.rotate(30);
        }, 3000)*/
        this.#enemies.push(enemy)
    }

    render() {
        this.#player.render();
        this.#enemies.forEach((enemy) => {
            enemy.move();
            
            enemy.render();
            if (this.#player.isShootEnemy(enemy)) {
                console.log("Shoot Enmy")
            }
            this.#context.font = "10px Arial";
            this.#context.fillStyle = "white";
            this.#context.fillText(`player P1 (${parseInt(this.player.x)}, ${parseInt(this.player.y)})`, 250, 250)
            this.#context.fillText(`player P2 (${this.player.x2}, ${parseInt(this.player.y2)})`, 250, 265)
            this.#context.fillText(`Enemy P1 (${enemy.x}, ${parseInt(enemy.y)})`, 250, 280)
            this.#context.fillText(`Enemy P1 (${enemy.x}, ${parseInt(enemy.y)})`, 250, 280)
           
        })



    }

    play() {
        this.#play = true;
    }

    reset() {
    }
    nextLevel() {
    }

    get gameOver() { return this.#gameofver; }
    get points() { return this.#points; }
    get level() { return this.#level; }
    get enemies() { return this.#enemies; }
    get player() { return this.#player; }
    get isPlay() {
        return this.#play;
    }

}