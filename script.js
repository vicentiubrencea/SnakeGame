const canvas = document.getElementById("snakeGame");
const context = canvas.getContext('2d');

let speed = 4;
let boardBoxes = 20; 
let elementSize = 18;

let snake = [];
let snakeLength = 3;
let snakeHeadX = 10;
let snakeheadY = 10;

let foodX = 5;
let foodY = 5;

let changeX = 0;
let changeY = 0;
let score = 0;

let gameOverFlag = false;

function playGame() {
    if (gameOverFlag == false) {
        gameOver();
        createScreen(); 
        changeDirectionsSnake();   
        moveSnake();
        createFood();
        snakeEatsFood();
        displayScore();
        setTimeout(playGame, 1000/speed);
    }
 }

function createScreen() {
    context.fillStyle= 'green';
    context.fillRect(0, 0, 400, 400);
}

function changeDirectionsSnake() {
    snakeHeadX += changeX;
    snakeheadY += changeY;    
}

function moveSnake() { 
    context.fillStyle="orange";
    let newSnake = {x: snakeHeadX, y: snakeheadY};
    snake.unshift(newSnake);
    for (let i = 0; i < snake.length; ++i) {
        context.fillRect(snake[i].x * boardBoxes, snake[i].y * boardBoxes, elementSize, elementSize);
    }
    if (snake.length == snakeLength) {
        snake.pop();
    } 
}
    
function createFood() {
    context.fillStyle="red";
    context.fillRect(foodX * boardBoxes, foodY * boardBoxes, elementSize, elementSize)
}

function snakeEatsFood() {
    if(foodX == snakeHeadX && foodY == snakeheadY) {
        ++snakeLength;
        speed += 0.2;
        score += speed;
        let foundPosition = 0;
        while (foundPosition == 0) {
            foodX = Math.floor(Math.random() * boardBoxes);
            foodY = Math.floor(Math.random() * boardBoxes);
            foundPosition = 1;
            for (let i = 0; i < snake.length; ++i) { 
                if (foodX == snake[i].x && foodY == snake[i].y) {
                    foundPosition = 0;
                }
            }
        }
    }
}

function displayScore() {
    document.getElementById("message").innerHTML = "Your score: " + Math.floor(score);
}

function gameOver() {
    if (snakeHeadX < 0 || snakeheadY < 0 || snakeHeadX == boardBoxes || snakeheadY == boardBoxes) {
        gameOverFlag = true;
    }
    for (let i = 1; i < snake.length; ++i) {
        let part = snake[i];
        if(snake.length > 2 && part.x == snakeHeadX && part.y == snakeheadY) {
            gameOverFlag = true;
            break;
        }
    }
    if (gameOverFlag == true) {
        document.getElementById("gameOver").innerHTML = "GAME OVER";
        document.getElementById("playAgain").innerHTML = "PRESS SPACE TO PLAY AGAIN";
    }
    return gameOverFlag;
}

document.body.addEventListener('keydown', keyDown);

function keyDown() {
    if (event.keyCode == 38 && changeY != 1) {
        changeY = -1;
        changeX = 0;    
    }
    if (event.keyCode == 40 && changeY != -1) {
        changeY = 1;
        changeX = 0;
    }
    if (event.keyCode == 37 && changeX != 1) {
        changeY = 0;
        changeX = -1;
    }
    if (event.keyCode == 39 && changeX != -1) {
        changeY = 0;
        changeX = 1;
    }
    if (event.keyCode == 32 && gameOverFlag == true) {
        location.reload();
    }
}

playGame(); 
