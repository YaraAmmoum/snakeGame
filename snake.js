//declare variable from html tags
const board = document.getElementById("gameBoard");
const instructionText = document.getElementById("instructionText");
const logo = document.getElementById("logo");
const score=document.getElementById("score");
const highScoreText=document.getElementById("highScore");

//declare game variable
let snake = [{ x: 10, y: 10 }];
const gridSize = 20;
let food = generateFood();
let direction = "right";
let gameInterval;
let highscore=0;
let gameSpeedDelay = 200;
let gameStarted = false;
//declare function
function Draw() {
  board.innerHTML = " ";
  drawSnake();
  drawFood();
  updateScore();

}
//declare drawSnake()
function drawSnake() {
  snake.forEach((segment) => {
    const snakeElement = createGameElement("div", "snake");
    setPosition(snakeElement, segment);
    board.appendChild(snakeElement);
  });
}
//create sanke,food
function createGameElement(tag, className) {
  const element = document.createElement(tag);
  element.className = className;
  return element;
}
//create setPosition() function (position of snake)
function setPosition(element, position) {
  element.style.gridColumn = position.x; //position =.x=segemnt&&segment=x or y of snake object
  element.style.gridRow = position.y;
}
// Draw();
//draw food function
function drawFood() {
    if(gameStarted){
  const foodElement = createGameElement("div", "food");
  setPosition(foodElement, food);
  board.appendChild(foodElement);}
}
//generate food
function generateFood() {
  const x = Math.floor(Math.random() * gridSize) + 1;
  const y = Math.floor(Math.random() * gridSize) + 1;
  return { x, y };
}
//move snake
function moveSnake() {
  const head = { ...snake[0] }; //shallow copy -->to don't alterate the original one
  switch (direction) {
    case "up":
      head.y--;
      break;
    case "down":
      head.y++;
      break;
    case "right":
      head.x++;
      break;
    case "left":
      head.x--;
      break;
    default:
  }
  snake.unshift(head); //add the copy of head in the first of the snake
  if (head.x === food.x && head.y === food.y) {
    food = generateFood();
    clearInterval(gameInterval);
    gameInterval = setInterval(() => {
      moveSnake();
      checkCollision();
      Draw();
    }, gameSpeedDelay);
  } else {
    snake.pop();
  }
}

//start the game
function startGame() {
  gameStarted = true;
  instructionText.style.display = "none";
  logo.style.display = "none";
  gameInterval = setInterval(() => {
    moveSnake();
    checkCollision();
    Draw();
  }, gameSpeedDelay);
}
function keyPressHandle(event) {
  if (
    (!gameStarted && event.code == "space") ||
    (!gameStarted && event.key == " ")
  ) {
    startGame();
  } else {
    switch (event.key) {
      case "ArrowUp":
        direction = "up";
        break;
      case "ArrowDown":
        direction = "down";
        break;
      case "ArrowLeft":
        direction = "left";
        break;
      case "ArrowRight":
        direction = "right";
        break;
      default:
    }
  }
}
document.addEventListener("keydown", keyPressHandle);
function checkCollision()
{
    const head=snake[0];
    if(head.x<1 || head.x>gridSize || head.y<1 || head.y>gridSize )
    {
        resetGame();
    }
    for(let i=1;i<snake.length;i++)
    {
        if(head.x===snake[i].x&&head.y===snake[i].y)
        {
            resetGame();
        }
    }
}
function resetGame()
{
    stopGame();
    Score();
    snake = [{ x: 10, y: 10 }];
    food = generateFood();
    direction = "right";
    gameSpeedDelay = 200;
    updateScore();
}
function updateScore()
{
    const currentScore=snake.length-1;//-1 because it is already start with 1 length
    score.textContent=currentScore.toString().padStart(3,'0');
}
function stopGame()
{
clearInterval(gameInterval);
gameStarted=false;
instructionText.style.display = "block";
logo.style.display = "block";

}
function Score()
{
    const currentScore=snake.length-1;
    if(currentScore>highscore)
    {
        highscore=currentScore;
        highScoreText.textContent=highscore.toString().padStart(3,'0');   
    }
    highScoreText.style.display="block";
}