var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var grid = 200;
var interval;
var levelUp = 5000;
var powerUpColor = 'rgb(15, 0, 255)';
var powerProb = 0.7;
var scale = 40;
var wallColor = 'white';
var walls = [];
var w = window.innerWidth;
var h = window.innerHeight;
if (w < 900) {
  canvas.width = w;
  canvas.height = w;
  scale = w / 20;
} else {
  canvas.width = 800;
  canvas.height = 800;
}
var snakeColor = 'rgb(115, 201, 255)';
var foodColor = 'orange';
var gridColor = 'rgb(0,0,0)'
var scoreColor = 'yellow'
var mouthColor = 'red';
var dx = 1;
var mySound;
var score;
var coinSound;
var deathSound;
var powerUpSound;
var dy = 0;
var powerUpTimeOut = null;
var food = {
  x: null,
  y: null,
  color: null,
}
var powerUp = {
  x: null,
  y: null,
  exists: null,
  id: null
}
var occupied = [];

function generateRandomX() {
  var result = Math.floor(20 * Math.random());
  for (var i = 0; i < walls.length; i++) {
    if (result == walls[i].x) {
      result = generateRandomX();
      break;
    }
  }
  return result;
}
function generateRandomY() {
  var result = Math.floor(20 * Math.random());
  for (var i = 0; i < walls.length; i++) {
    if (result == walls[i].y) {
      result = generateRandomY();
      break;
    }
  }
  return result;
}
function clearPowerUp() {
  powerUp.exists = null;
  powerUp.x = null;
  powerUp.y = null;
}

function createFood() {
  food.x = generateRandomX();
  food.y = generateRandomY();
  food.color = 'red';
  if (Math.random() >= powerProb) {
    clearPowerUp();
    clearTimeout(powerUpTimeOut);
    powerUp.exists = true;
    powerUp.x = generateRandomX();
    powerUp.y = generateRandomY();
    powerUpTimeOut = setTimeout(clearPowerUp, 10000);
  }
}
var tempdx, tempdy, temp1, temp2;
class Block {
  constructor(x, y, dx, dy) {
    this.x = x;
    this.y = y;
    this.next = null;
    this.dx = dx;
    this.dy = dy;
  }
  move() {
    this.x = this.x + this.dx;
    this.y = this.y + this.dy;
    if (this.x > 19) {
      this.x = 0;
    }
    if (this.x < 0) {
      this.x = 19;
    }
    if (this.y > 19) {
      this.y = 0;
    }
    if (this.y < 0) {
      this.y = 19;
    }
    occupied.push({ x: this.x, y: this.y });
    // console.log("After:", this.dx, this.dy);
    temp1 = this.dx;
    temp2 = this.dy;
    this.dx = tempdx;
    this.dy = tempdy;
    tempdx = temp1;
    tempdy = temp2;
    if (this.next) {
      this.next.move();
    }

  }
}
class Snake {
  constructor() {
    this.head = new Block(0, 0, 1, 0);
    this.level = 1;

  }
  move() {
    tempdx = dx;
    tempdy = dy;
    this.head.move();
  }
  push() {
    var block = this.head;
    while (block.next != null) {
      block = block.next;
    }
    block.next = new Block(block.x - block.dx, block.y - block.dy, block.dx, block.dy);


  }
}
var snake;

document.addEventListener("keydown", keyDownHandler, false);
function keyDownHandler(e) {
  dx = snake.head.dx;
  dy = snake.head.dy;
  if (e.key == 'ArrowLeft') {
    if (dy != 0) {
      dx = -1;
      dy = 0;
    }
  } else if (e.key == 'ArrowRight') {
    if (dy != 0) {
      dx = 1;
      dy = 0;
    }
  } else if (e.key == 'ArrowUp') {

    if (dx != 0) {
      dy = -1;
      dx = 0;
    }
  } else if (e.key == 'ArrowDown') {
    if (dx != 0) {
      dy = 1;
      dx = 0;
    }
  }
  // console.log("Keypress:", dx, dy);
}
function moveSnake() {
  snake.move();
}

function move(direction) {
  keyDownHandler({
    key: direction
  })
}

function checkFoodEat() {
  if (snake.head.x == food.x && snake.head.y == food.y) {
    snake.push();
    createFood();
    coinSound.play()
  }
  if (snake.head.x == powerUp.x && snake.head.y == powerUp.y) {
    snake.push();
    setTimeout(snake.push, 250);
    setTimeout(snake.push, 450);
    setTimeout(snake.push, 650);
    setTimeout(snake.push, 850);
    powerUp.exists = null;
    powerUpSound.play();

  }
}
function lost() {

  mySound.pause();
  deathSound.play();
  ctx.fillStyle = scoreColor;
  ctx.font = "50px Arial";
  clearInterval(interval);
  interval = null;
  clearTimeout(powerUpTimeOut);
  ctx.textAlign = "center";
  ctx.fillStyle = gridColor;
  ctx.fillStyle = "black";
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'yellow';
  ctx.textAlign = "center";
  ctx.fillText("Game Over!", canvas.width / 2, 100);
  ctx.font = "20px Arial";
  ctx.fillStyle = foodColor;
  score = levelUp * (snake.level - 1) + score;
  ctx.fillText(`Score : ${score}`, canvas.width / 2, 150);
  ctx.fillText(`Press Start Game to replay.`, canvas.width / 2, 180);
  ctx.fillStyle = 'white';
  ctx.fillText(`Programmed by Divyanshu Agrawal.`, canvas.width / 2, 210);
}

function createLevel(level) {

  snake = null;
  score = 0;
  snake = new Snake();
  snake.level = level;
  occupied = [];
  clearInterval(interval);
  if (level == 2) {
    window.interval = setInterval(drawGame, 100);
    snakeColor = "rgb(145, 231, 136)";
    walls = [];
    walls.push({ x: 0, y: 9 });
    walls.push({ x: 1, y: 9 });
    walls.push({ x: 2, y: 9 });
    walls.push({ x: 3, y: 9 });
    walls.push({ x: 4, y: 9 });
    walls.push({ x: 5, y: 9 });
    walls.push({ x: 19, y: 5 });
    walls.push({ x: 18, y: 5 });
    walls.push({ x: 17, y: 5 });
    walls.push({ x: 16, y: 5 });
    walls.push({ x: 15, y: 5 });
  }
}

function checkLevel(level) {
  // console.log(level);
}

function drawGrid() {

  ctx.fillStyle = gridColor;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (powerUp.exists) {
    // console.log("Rendered");
    ctx.fillStyle = powerUpColor;
    // console.log("powerup:", powerUp.x, powerUp.y, scale, scale);
    ctx.fillRect(powerUp.x * scale, powerUp.y * scale, scale, scale);
  }
  var block = snake.head;
  ctx.fillStyle = snakeColor;
  checkFoodEat();
  score = occupied.length * 100 - 200;

  // Increase Levels

  if (walls.length > 0) {
    ctx.fillStyle = wallColor;
    for (var i = 0; i < walls.length; i++) {
      ctx.fillRect(walls[i].x * scale, walls[i].y * scale, scale, scale);
    }
  }

  if (score > levelUp && snake.level != 2) {
    createLevel(2);
    checkLevel(2);
  }

  ctx.fillStyle = snakeColor;


  // Check for Dead Snake 
  for (var i = 1; i < occupied.length; ++i) {
    if (snake.head.x == occupied[i].x && snake.head.y == occupied[i].y) {
      lost()
      return;
    }
  }

  for (var i = 0; i < walls.length; i++) {
    if (snake.head.x == walls[i].x && snake.head.y == walls[i].y) {
      lost()
      return;
    }
  }


  // Render Snake Body

  while (block != null) {

    ctx.fillRect(block.x * scale, block.y * scale, scale, scale);
    block = block.next;
  }
  ctx.fillStyle = food.color;
  ctx.fillRect(food.x * scale, food.y * scale, scale, scale);

  if (snake.level > 1) {
    console.log(snake.level);
    score += levelUp * (snake.level - 1) + 200;
  } else {
  }
  ctx.fillStyle = scoreColor;
  if (w < 900) {
    ctx.font = '10px Arial';
    ctx.fillText(`Score: ${score}`, 5, 10);
    ctx.fillText(`Level : ${snake.level}`, scale * 18, 10);
  } else {
    ctx.font = "20px Arial";
    ctx.fillText(`Score: ${score}`, 25, 20);
    ctx.fillText(`Level : ${snake.level}`, 25, 45);


  }

}


function drawGame() {
  occupied = [];
  moveSnake()
  drawGrid()


}

// startGame()

function startGame() {
  document.getElementById('start').innerHTML = "Reload Window";
  if (snake) {
    window.location.reload();
  }
  alert(`Welcome to Snake! Instructions:\n*Dont eat yourself.\n*You can teleport from walls.\n*Collect Food and Powerups.\n*Increase score to level up.\n*Compete in the leaderboard ( coming in less than 48 hours )`);
  snake = new Snake();
  score = 0;
  occupied = [];
  snake.push();
  mySound = new Audio('sound.mp3');
  mySound.pause();
  powerUpSound = new Audio('powerup.wav');
  coinSound = new Audio('food.wav');
  deathSound = new Audio('death.wav');
  mySound.loop = true;
  mySound.play();
  interval = setInterval(drawGame, 150);
  createFood();
  document.getElementById('pause').innerHTML = 'Pause Game';
}

// pauseGame()

function pauseGame() {
  if (interval) {
    clearInterval(interval);
    interval = null;
    mySound.pause();
    document.getElementById('pause').innerHTML = 'Unpause Game';
  }
  else {
    interval = setInterval(drawGame, 150);
    mySound.play();
    document.getElementById('pause').innerHTML = 'Pause Game';
  }
}

var hammertime = new Hammer(document.getElementById('body'));
hammertime.get('swipe').set({ direction: Hammer.DIRECTION_ALL });
hammertime.on('swipeleft', function (ev) {
  move('ArrowLeft');
  // alert("Left")
});
hammertime.on('swiperight', function (ev) {
  move('ArrowRight');
  // alert('Right');
});
hammertime.on('swipeup', function (ev) {
  move('ArrowUp');
  // alert("Up");
});
hammertime.on('swipedown', function (ev) {
  // alert("LOL")
  // alert("Down");
  move('ArrowDown');
});