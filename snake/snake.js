var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var grid = 200;
var interval;
var scale = 40;
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
var dy = 0;
var food = {
    x: null,
    y: null,
    color: null,
}
var occupied = [];
function createFood() {

    food.x = Math.floor(20 * Math.random());
    food.y = Math.floor(20 * Math.random());

    food.color = 'red';
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

function checkFoodEat() {
    if (snake.head.x == food.x && snake.head.y == food.y) {
        snake.push();
        createFood();
        coinSound.play()
    }
}
function lost() {
    mySound.pause();
    deathSound.play();
    ctx.fillStyle = scoreColor;
    ctx.font = "50px Arial";
    clearInterval(interval);
    ctx.textAlign = "center";
    ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
    ctx.fillText("Game Over!", myCanvas.width / 2, 200);
    ctx.font = "20px Arial";
    ctx.fillStyle = foodColor;
    ctx.fillText(`Score : ${score}`, myCanvas.width / 2, 250);
    ctx.fillText(`Press Start Game to replay.`, myCanvas.width / 2, 280);
    ctx.fillStyle = 'white';
    ctx.fillText(`Programmed by Divyanshu Agrawal.`, myCanvas.width / 2, 310);
}
function drawGrid() {
    ctx.fillStyle = gridColor;
    ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
    var block = snake.head;
    ctx.fillStyle = snakeColor;
    checkFoodEat();
    score = occupied.length * 100 - 200;
    ctx.fillStyle = scoreColor;
    ctx.font = "20px Arial";
    ctx.fillText(score, 10, 20);
    ctx.fillStyle = snakeColor;
    for (var i = 1; i < occupied.length; ++i) {
        if (snake.head.x == occupied[i].x && snake.head.y == occupied[i].y) {
            lost()
        } else {
        }
    }
    while (block != null) {

        ctx.fillRect(block.x * scale, block.y * scale, scale, scale);
        block = block.next;
    }
    ctx.fillStyle = food.color;
    ctx.fillRect(food.x * scale, food.y * scale, scale, scale);


}


function drawGame() {
    occupied = [];
    moveSnake()
    drawGrid()


}

function startGame() {
    var soundtrack;
    snake = new Snake();
    score = 0;
    occupied = [];
    snake.push();
    mySound = new Audio('sound.mp3');
    coinSound = new Audio('food.wav');
    deathSound = new Audio('death.wav');
    mySound.loop = true;
    mySound.play();
    interval = setInterval(drawGame, 150);
    createFood();
}

// startGame()
