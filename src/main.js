import { Game } from './game.class.js';
import { Colors } from './ui/colors.js';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const gameSpeed = 60;
//canvas.width = window.innerWidth;
//canvas.height = window.innerHeight;

// Create circle

canvas.width = 900;
canvas.height = 500;

let counterLoop = 0;
let lastMark = new Date().getTime();

const music = new Audio('assets/sounds/music.mp3');
music.volume = 0.3;
music.addEventListener('ended', function () {
  music.currentTime = 13;
  music.play();
}, false);
//music.play();


const game = new Game(canvas);
game.nextLevel();
let fps = 20;
let fpsCounter = 0;
let initMark = new Date().getTime();
let playerPos = "";
const timer = setInterval(() => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = Colors.background;
  ctx.fillRect(0,0, canvas.width, canvas.height)
  if(game.gameOver){
    ctx.font = "40px Arial";
    ctx.fillStyle = 'gray';
    ctx.fillText(`Game Over`, (canvas.width/2)-100, canvas.height/2);
    clearInterval(timer);
  }
  if (counterLoop >= 100) {
    //setInterval(clearInterval(timer))
  }
  const now = new Date().getTime();
  const milliSecondsDif = (now) - lastMark;
  const time = parseInt((now - initMark) / 1000);

  if (milliSecondsDif >= 1000) {
    lastMark = new Date().getTime();
    fps = fpsCounter;
    fpsCounter = 0;
  }

  /*
  ctx.strokeText(`d: ${ball.vector.dir.toFixed(0)}° | v: ${ball.vector.vel.vel}`, canvas.width - 200, canvas.height - 10);
  ctx.strokeText(`vx:  ${ball.vector.vel.x.toFixed(2)} | vy:  ${ball.vector.vel.y.toFixed(2)}`, canvas.width - 200, canvas.height - 25);
  ctx.strokeText(`dX: ${Math.sin(ball.vector.dir).toFixed(2)} | dY: ${Math.cos(ball.vector.dir).toFixed(2)}`, canvas.width - 200, canvas.height - 40);
  */
  game.render();
  ctx.font = "12px Arial";
  ctx.fillStyle =  Colors.indicators;

  ctx.fillText(`Enemies: ${game.enemies.length} | Level: ${game.level} | points: ${game.points}`, 15, 45);
  ctx.fillText(`Shoots: ${game.player.shoots.length} `, 15, 30);
  ctx.fillText(`fps: ${fps} | time: ${time}seg`, 15, 15);
  fpsCounter++;
  //counterLoop++;
}, 1000 / (gameSpeed))
canvas.addEventListener('mousemove', function (event) {
  playerPos = `player: x: ${event.offsetX} | y: ${event.offsetY}`;
  game.player.setPos(20, event.offsetY)
  // Check whether point is inside circle
  /*if (ctx.isPointInPath(circle, event.offsetX, event.offsetY)) {
    ctx.fillStyle = 'green';
  }
  else {
    ctx.fillStyle = 'red';
  }

  // Draw circle
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fill(circle);*/
});
canvas.addEventListener('click', function (event) {
  game.player.shoot();
});
/*
// Listen for mouse moves
canvas.addEventListener('mousemove', function(event) {
  // Check whether point is inside circle
  if (ctx.isPointInPath(circle, event.offsetX, event.offsetY)) {
    ctx.fillStyle = 'green';
  }
  else {
    ctx.fillStyle = 'red';
  }

  // Draw circle
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fill(circle);
});

canvas.addEventListener('click', function(event) {
  // Check whether point is inside circle
  if (ctx.isPointInPath(circle, event.offsetX, event.offsetY)) {
    ctx.fillStyle = 'blue';
  }
  else {
    ctx.fillStyle = 'red';
  }

  // Draw circle
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fill(circle);
});*/