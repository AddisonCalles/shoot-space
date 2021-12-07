import { random } from '../../common/helpers/math.js';
import { queenShipV1Drawing } from '../../drawings/enemies/queen-ship-v1.drawing.js';
import { EnergyBall } from '../energyball.class.js';
import { Enemy } from './enemy.class.js';

export class QueenShipV1 extends Enemy {
    #evilMode;
    #evilModeTimer;
    #gunsRunnerProcess;
    #energyBalls = [];
    #guns;
    #velocity = 1;

    constructor(canvas, player) {
        //super(canvas,(canvas.width / 2)-300, (canvas.height / 2)-300, 300, 300, 50, player);
        super(canvas, canvas.width - 200, 0, 300, 300, 200, player);
        super.centerOffset();
        super.setLeyers(queenShipV1Drawing('red', this));
        this.#guns = [
            { x: 10, y: 60, dir: 180 },
            { x: 10, y: 240, dir: 180 },
            { x: 160, y: 10, dir: 180 },
            { x: 160, y: 290, dir: 180 },
        ];
        super.vector.setDir(180);
        super.rotate(180);
        super.vector.setVelXY(0, this.#velocity);
        super.enabledVectorRotation = false;
        this.#gunsRunner();
    }


    render() {
        this.#energyBalls = this.#energyBalls.filter((ball) => !ball.edgeColision() && !ball.isDestroy());
        this.#energyBalls.forEach(ball => {
            if(ball.hasColision(this.player)){
                this.player.health.reduce(1);
                ball.destroy();
            }else{
                ball.move();
                ball.render();
            }

        });
        super.render();
    }


    move() {
        const colision = super.edgeColision();
        if (colision == 'bottom' || colision == 'top') {
            super.vector.setVelXY(0, this.vector.vel.y * -1);
        }

        if (this.vector.vel.x == 0 && this.x2 > (this.canvas.width - (this.canvas.width * 0.1))) {
            super.vector.setVector(this.#velocity, random(230, 150));
        }
        if (this.vector.vel.x != 0 && this.x2 < (this.canvas.width - (this.canvas.width * 0.1))) {
            super.vector.setVelXY(0, this.#velocity);
        }

        if (!colision && this.vector.vel.y == 0) {
            super.vector.setVelXY(0, this.#velocity);
        }

        super.move();
    }

    #gunsRunner() {
        this.#gunsRunnerProcess = setInterval(() => {
            this.fire();
        }, 500);
    }

    fire() {
        const indexGun = parseInt(random(0, this.#guns.length - 0.9));
        const energyBall = new EnergyBall(canvas, 'gray', this.x + this.#guns[indexGun].x, this.y + this.#guns[indexGun].y);
        energyBall.vector.setVector(3, 180);
        this.#energyBalls.push(energyBall)
    }


    destroy() {
        try {
            clearInterval(this.#gunsRunnerProcess);
        } catch (error) {

        }
        super.destroy();
    }
}