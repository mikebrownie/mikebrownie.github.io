const canvas = document.getElementById('game');
const context = canvas.getContext('2d');

////VARIABLE DECLARATIONS - CONTROLLER////
const KEY_CODE_LEFT = 37;
const KEY_CODE_RIGHT = 39;
const KEY_CODE_UP = 38;
const KEY_CODE_DOWN = 40;

// controller object here
const controller = {
  leftPressed: false,
  rightPressed: false,
  upPressed: false,
  downPressed: false,
};

////END VARIABLE DECLARATIONS - CONTROLLER////

////START VARIABLE DECLARATIONS - GAME OBJECTS////
var ID=0;
const grid = 16;
var count = 0;
var score=0;
var max=0;

// apple object here
const apple = {
  x: 320,
  y: 320
};

// 2.1: Snake object here
const SNAKE_MAX_SPEED = 16;
const STARTING_LENGTH = 4;

const snake = {
  // snake posistion
    x: 160,
    y: 160,

    // snake velocity. moves one SNAKE_MAX_SPEED length every frame in either the x or y direction
    dx: SNAKE_MAX_SPEED,
    dy: 0,

    // keep track of all grids the snake body occupies
    cells: [],

    //starting length of the snake. grows when eating an apple
    maxCells: STARTING_LENGTH
  };

////END VARIABLE DECLARATIONS - GAME OBJECTS////

////BEGIN FUNCTION DEFINITIONS////
// resetGame()
function resetGame() {
  if(score>max)
  {
    max=score;
  }

  snake.x = 160;
  snake.y = 160;
  snake.cells = [];
  snake.maxCells = STARTING_LENGTH;
  snake.dx = SNAKE_MAX_SPEED;
  snake.dy = 0;

  score=0;
  apple.x = getRandomInt(0, 25) * grid;
  apple.y = getRandomInt(0, 25) * grid;
  document.getElementById('high').innerHTML=max;
  document.getElementById('score').innerHTML=score;
}

// resetController() clears controller input
function resetController(){
  controller.leftPressed= false;
  controller.rightPressed= false;
  controller.upPressed= false;
  controller.downPressed= false;
}

// 2.6 snakeHitWall(), wraps snake whenever it hits the wall
function snakeHitWall() {
    // wrap snake position horizontally on edge of screen
  if (snake.x < 0) {
    snake.x = canvas.width - grid;
  }
  else if (snake.x >= canvas.width) {
    snake.x = 0;
  }

  // wrap snake position vertically on edge of screen
  if (snake.y < 0) {
    snake.y = canvas.height - grid;
  }
  else if (snake.y >= canvas.height) {
    snake.y = 0;
  }
}

// moveSnake(), moves snake based on direction
function moveSnake() {

  //changeDirection and reset controller
  changeDirection();
  resetController();

  // move snake by it's velocity
  snake.x += snake.dx;
  snake.y += snake.dy;

  //2.6 snakeHitWall call here
  snakeHitWall();

  // keep track of where snake has been. front of the array is always the head
  snake.cells.unshift({x: snake.x, y: snake.y});
  // remove cells as we move away from them
  if (snake.cells.length > snake.maxCells) {
    snake.cells.pop();
  }
}

// snakeHitSelf, ends game whe snake collides with itself
function snakeHitSelf(index, cell) {
  for (var i = index + 1; i < snake.cells.length; i++)
  {
    // snake occupies same space as a body part. reset game
    if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y)
    {
      resetGame();
    }
  }
}

//changeDirection() changes direction of snake based on key input
function changeDirection(){
  if (controller.leftPressed) {
    snake.dx = -SNAKE_MAX_SPEED;
    snake.dy = 0;
  }
  else if (controller.rightPressed) {
    snake.dx = SNAKE_MAX_SPEED;
    snake.dy = 0;
  }
  else if (controller.upPressed) {
    snake.dx = 0;
    snake.dy = -SNAKE_MAX_SPEED;
  }
  else if (controller.downPressed) {
    snake.dx = 0;
    snake.dy = SNAKE_MAX_SPEED;
  }
  resetController();
}

// resetController() clears controller flags
function resetController(){
  controller.leftPressed= false;
  controller.rightPressed= false;
  controller.upPressed= false;
  controller.downPressed= false;
}


//calls move
function updateSnake(){
  moveSnake();
  // draw snake one cell at a time
  context.fillStyle = 'green';
  snake.cells.forEach(function(cell, index) {

    // drawing 1 px smaller than the grid creates a grid effect in the snake body so you can see how long it is
    context.fillRect(cell.x, cell.y, grid-1, grid-1);

    // check collision with all cells after this one (modified bubble sort)
    snakeHitSelf(index, cell)
  });
}

////BEGIN FUNCTION DEFINITIONS - APPLE////

//NOW 7/14/2020 update 7/8/2020 UPDATE
function moveApple() {
  var inSnake = false;
  do { //make new apple coordinates while its in the snake
    // canvas is 800x800 which is 50x50 grids
    apple.x = getRandomInt(0, 50) * grid;
    apple.y = getRandomInt(0, 50) * grid;


    for(var i = 0; i < snake.cells.length; i++) {
      if (snake.cells[i].x == apple.x && snake.cells[i].y == apple.y) {
          inSnake = true;
      }
    }
  } while (inSnake == true)
}

// get random whole numbers in a specific range https://stackoverflow.com/a/1527820/2124254
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}



function updateApple(){
  context.clearRect(0,0,canvas.width,canvas.height);
  context.fillStyle = 'red';
  context.fillRect(apple.x, apple.y, grid-1, grid-1);

  //4.5 add check for snake eating apple
  if (snake.x === apple.x && snake.y === apple.y) {
    snakeEatApple();
  }
}


function snakeEatApple() {
  snake.maxCells+=5;
  score+=5;
  document.getElementById('score').innerHTML=score;
  moveApple();


}

////END FUNCTION DEFINITIONS - APPLE////



//MAIN GAME LOOP
function update() {
  ID = requestAnimationFrame(update);
  // slow game loop to 10 fps instead of 60 (60/10 = 6)
  if (++count < 6) {
    return;
  }
  count = 0;

  context.clearRect(0,0,canvas.width,canvas.height);

  updateApple()
  updateSnake()

}

////EVENT LISTENERS
//onKeyDown() sets flags on keypresses
function onKeyDown(e) {
  if (e.keyCode === KEY_CODE_LEFT && snake.dx === 0) {
    controller.leftPressed = true;
  } else if (e.keyCode === KEY_CODE_RIGHT && snake.dx === 0) {
    controller.rightPressed = true;
  } else if (e.keyCode === KEY_CODE_UP && snake.dy === 0) {
    controller.upPressed = true;
  } else if (e.keyCode === KEY_CODE_DOWN && snake.dy === 0) {
    controller.downPressed = true;
  }
}



//add event listeners to the window
window.addEventListener("keydown", onKeyDown);
window.addEventListener("click", start);
////END EVENT LISTENERS////

// start the game
function start() {
    cancelAnimationFrame(ID);
    ID = requestAnimationFrame(update);
}
