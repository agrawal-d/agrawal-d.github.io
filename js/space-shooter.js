var WIDTH = document.getElementsByClassName("main-window")[0].clientWidth - 50;
var HEIGHT = window.screen.height * 0.7;

var canvas = document.getElementById("mycanvas")
canvas.width = WIDTH
canvas.height = HEIGHT
var ctx = document.getElementById("mycanvas").getContext('2d');
clearCanvas();

var mycanvas = document.getElementById("mycanvas")

var score = 0, alive = true, lives = 3;
var gameStarted = false;
var speed_game = 30;
var timer = 0;

var enemyImage = new Image()
var shipImage = new Image();
var bulletImage = new Image();

var ship = { //Object ship which contains all attributes of the ship
    x: WIDTH / 2,
    y: HEIGHT - 100,
    w: 50,
    h: 50,
    speedBullet: 15,

    draw: function () {
        if (ship.x > (WIDTH - 50)) {
            ship.x = WIDTH - 50;
        }
        if (ship.y > (HEIGHT - 50)) {
            ship.y = HEIGHT - 50;
        }
        if (ship.x < 50) {
            ship.x = 50
        }
        if (ship.y < 50) {
            ship.y = 50
        }

        ctx.drawImage(shipImage, ship.x, ship.y, ship.w, ship.h) //Used to draw our ship on the canvas with required coordinates along with height and width
    },
}

function clearCanvas() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
}

function init() {
    //Loading all required images
    shipImage.src = "img/space-shooter/spaceship.png";
    enemyImage.src = "img/space-shooter/enemy.png";
    bulletImage.src = "img/space-shooter/bullet.png";

    mycanvas.addEventListener('click', gameStart, false);

    addEnemies();
    gameLoop();
}

function gameStart() {
    gameStarted = true;
    mycanvas.removeEventListener('click', gameStart, false);
}

var enemyList = [];
var enemyTotal = 5;

function enemy(x, y, speed, width = 50, height = 50) {
    this.x = x,
        this.y = y,
        this.w = width,
        this.h = height,
        this.speed = speed,
        this.count = 0, //To measure the cycle from left to right

        this.draw = function () {
            ctx.drawImage(enemyImage, this.x, this.y, this.w, this.h);
        }
}

function addEnemies() {
    //Setting an initial x and y
    var enemyWidth = 50, enemyHeight = 50;
    var temp_x = 50, temp_y = -25, speed = 5;
    for (var i = 0; i < enemyTotal; i++) {
        var e = new enemy(temp_x, temp_y, speed, enemyWidth, enemyHeight)
        enemyList.push(e);
        temp_x += (WIDTH - 150) / (enemyTotal - 1);
    }
}

function drawEnemies() {
    for (var i = 0; i < enemyTotal; i++) {
        enemyList[i].draw();
    }
}

function moveEnemies() {
    for (var i = 0; i < enemyList.length; i++) {
        if (enemyList[i].y < HEIGHT) {
            enemyList[i].y += Math.abs(5);
        }
        else if (enemyList[i].y > HEIGHT - 1) {
            enemyList[i].y = -40;
        }
    }
}

//%%%%%%%%%%%BULLET

var bulletTotal = 5;
var bulletList = [];

function bullet(x, y, speed) {
    this.x = x;
    this.y = y;
    this.w = 5;
    this.h = 10,
        this.state = "active"
    this.speed = speed;

    this.draw = function () {
        ctx.drawImage(bulletImage, this.x, this.y, this.w, this.h)
    }
}

function drawBullet() {
    for (var i = 0; i < bulletList.length; i++) {
        bulletList[i].draw();
    }
}

function moveBullet() {
    for (var i = 0; i < bulletList.length; i++) {
        if (bulletList[i].y > -11) {
            bulletList[i].y -= bulletList[i].speed
        }
        else if (bulletList[i].y < -10) {
            bulletList.splice(i, 1);
        }
    }
}

//%%%%%%%Collision Test and Score increment

function collisionBullet() {
    var check = false;
    for (var i = 0; i < bulletList.length; i++) {
        for (var j = 0; j < enemyList.length; j++) {
            if (bulletList[i].y <= (enemyList[j].y + enemyList[j].h) && bulletList[i].x >= enemyList[j].x && bulletList[i].x <= (enemyList[j].x + enemyList[j].w)) {
                check = true;
                enemyList.splice(j, 1);
                score += 10;
                var e = new enemy((Math.random() * (WIDTH - 100)) + 50, -25, 5);
                enemyList.push(e);
            }
        }
        if (check == true) {
            bulletList.splice(i, 1);
            check = false;
        }
    }
}

function collisionShip() {
    var ship_xw = ship.x + ship.w, ship_yh = ship.y + ship.h;
    for (var i = 0; i < enemyList.length; i++) {
        if (ship.x > enemyList[i].x && ship.x < (enemyList[i].x + enemyList[i].w) && ship.y > enemyList[i].y && ship.y < (enemyList[i].y + enemyList[i].h)) {
            checkLives();
        }
        if (ship_xw < enemyList[i].x + enemyList[i].w && ship_xw > enemyList[i].x && ship.y > enemyList[i].y && ship.y < enemyList[i].y + enemyList[i].h) {
            checkLives();
        }
        if (ship_yh > enemyList[i].y && ship_yh < enemyList[i].y + enemyList[i].h && ship.x > enemyList[i].x && ship.x < enemyList[i].x + enemyList[i].w) {
            checkLives();
        }
        if (ship_yh > enemyList[i].y && ship_yh < enemyList[i].y + enemyList[i].h && ship_xw < enemyList[i].x + enemyList[i].w && ship_xw > enemyList[i].x) {
            checkLives();
        }
    }
}

//%%%%%%%Score display
function displayScore() {
    ctx.font = 'bold 15px Orbitron';
    ctx.fillStyle = '#fff'
    ctx.fillText("Score: ", WIDTH - 100, 30);
    ctx.fillText(score, WIDTH - 40, 30);
    ctx.fillText('Lives:', 10, 30);
    ctx.fillText(lives, 70, 30);

    if (!gameStarted) {
        ctx.font = 'bold 25px Orbitron';
        ctx.fillText('Generic Space Shooter', WIDTH / 2 - 150, HEIGHT / 2);
        ctx.font = 'bold 20px Orbitron';
        ctx.fillText('Click to Play', WIDTH / 2 - 56, HEIGHT / 2 + 30);
        ctx.fillText('Use arrow keys to move', WIDTH / 2 - 125, HEIGHT / 2 + 60);
        ctx.fillText('Use the spacebar key to shoot', WIDTH / 2 - 150, HEIGHT / 2 + 90);
    }

    if (!alive) {
        ctx.fillText('Game Over!', WIDTH / 2 - 50, HEIGHT / 2);
        ctx.fillText('Click anywhere to play again', WIDTH / 2 - 100, HEIGHT / 2 + 25);
        mycanvas.addEventListener('click', gameRestart, false);
    }
}

//%%%%%%%%%Lives check and Reset
function checkLives() {
    lives -= 1;
    if (lives > 0) {
        reset();
    }
    else if (lives == 0) {
        alive = false;
    }
}

function reset() {
    ship.x = WIDTH / 2;
    ship.y = HEIGHT - 100;
    enemyList = [];
    addEnemies();
}

function gameRestart() {
    ship.x = WIDTH / 2;
    ship.y = HEIGHT - 100;
    score = 0;
    lives = 3;
    enemyList = [];
    alive = true;
    addEnemies();
    mycanvas.removeEventListener('click', gameRestart, false);
}

document.onkeydown = function (event) {
    if (event.key == "ArrowLeft") {  //Left arrow key pressed
        ship.x = ship.x - 10;
    }
    else if (event.key == "ArrowUp") { //Up arrow key
        ship.y = ship.y - 10;
    }
    else if (event.key == "ArrowRight") { //Right arrow key
        ship.x = ship.x + 10;
    }
    else if (event.key == "ArrowDown") { //Down arrow key
        ship.y = ship.y + 10;
    }
    else if (event.key == " " && bulletList.length <= bulletTotal) { //Space pressed 
        var b = new bullet(ship.x + 25, ship.y - 10, ship.speedBullet)
        bulletList.push(b);
    }
}
window.addEventListener("keydown", function (e) {
    // arrow keys and space
    if (["ArrowLeft", "ArrowUp", "ArrowRight", "ArrowDown", " "].indexOf(e.key) > -1) {
        e.preventDefault();
    }
}, false);

function gameLoop() {
    clearCanvas();
    if (alive && lives > 0 && gameStarted) {
        collisionBullet();
        collisionShip();
        moveEnemies();
        moveBullet();
        drawEnemies();
        ship.draw();
        drawBullet();
        displayScore();
        timer = timer + 1;
        if (timer % 100 == 0) {
            if (speed_game > 7) {
                speed_game = speed_game - 0.5;
            }
        }
    }
    displayScore();
    var game = setTimeout(gameLoop, speed_game);
}

window.onload = init;