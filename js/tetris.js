// Game structure

let main = document.querySelector(".tetris");

let playfield = [
  [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

function drawBlock() {
  let mainInner = "";
  for (let x = 0; x < playfield.length; x++) {
    for (let y = 0; y < playfield[x].length; y++) {
      if (playfield[x][y] === 1) {
        mainInner += '<div class = "block movingBlock"></div>';
      } else if (playfield[x][y] === 2) {
        mainInner += '<div class = "block fixedBlock"></div>';
      } else {
        mainInner += '<div class = "block"></div>';
      }
    }
  }
  main.innerHTML = mainInner;
}

function canMove() {
  for (let x = 0; x < playfield.length; x++) {
    for (let y = 0; y < playfield[x].length; y++) {
      if (playfield[x][y] === 1) {
        if (x === playfield.length - 1 || playfield[x + 1][y] === 2) {
          return false;
        }
      }
    }
  }
  return true;
}

// move Down
function moveDown() {
  if (canMove()) {
    for (let x = playfield.length - 1; x >= 0; x--) {
      for (let y = 0; y < playfield[x].length; y++) {
        if (playfield[x][y] === 1) {
          playfield[x + 1][y] = 1;
          playfield[x][y] = 0;
        }
      }
    }
  } else {
    fixedBlock();
  }
}

// move Left
function moveLeft() {
  if (canMoveLeft()) {
    for (let x = playfield.length - 1; x >= 0; x--) {
      for (let y = 0; y < playfield[x].length; y++) {
        if (playfield[x][y] === 1) {
          playfield[x][y - 1] = 1;
          playfield[x][y] = 0;
        }
      }
    }
  }
}

function canMoveLeft() {
  for (let x = 0; x < playfield.length; x++) {
    for (let y = 0; y < playfield[x].length; y++) {
      if (playfield[x][y] === 1) {
        if (y === 0 || playfield[x][y - 1] === 2) {
          return false;
        }
      }
    }
  }
  return true;
}

// move right
function canMoveRight() {
  for (let x = 0; x < playfield.length; x++) {
    for (let y = 0; y < playfield[x].length; y++) {
      if (playfield[x][y] === 1) {
        if (y === playfield[x].length - 1 || playfield[x][y + 1] === 2) {
          return false;
        }
      }
    }
  }
  return true;
}

function moveRight() {
  if (canMoveRight()) {
    for (let x = playfield.length - 1; x >= 0; x--) {
      for (let y = playfield[x].length - 1; y >= 0; y--) {
        if (playfield[x][y] === 1) {
          playfield[x][y + 1] = 1;
          playfield[x][y] = 0;
        }
      }
    }
  }
}

function fixedBlock() {
  for (let x = 0; x < playfield.length; x++) {
    for (let y = 0; y < playfield[x].length; y++) {
      if (playfield[x][y] === 1) {
        playfield[x][y] = 2;
      }
    }
  }

  checkLines();

  playfield[0] = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  playfield[1] = [0, 0, 0, 0, 1, 1, 0, 0, 0, 0];
}

drawBlock();

function checkLines() {
  let removeLine = true;
  for (let x = 0; x < playfield.length; x++) {
    for (let y = 0; y < playfield[x].length; y++) {
      if (playfield[x][y] !== 2) {
        removeLine = false;
				break;
      }
    }
    if (removeLine) {
      playfield.splice(x, 1);
			playfield.splice(0,0,[0,0,0,0,0,0,0,0,0,0])
    }
		removeLine = true
  }
}

// up 38
// left 37
// right 39
// down 40

// ArrowUp
// ArrowLeft
// ArrowRight
// ArrowDown

document.addEventListener("keydown", function (e) {
  switch (e.key) {
    case "ArrowRight":
      console.log("Right");
      moveRight();
      break;

    case "ArrowLeft":
      console.log("Left");
      moveLeft();
      break;

    case "ArrowDown":
      moveDown();
      break;

    case "ArrowUp":
      console.log("Up");
      break;

    case " ":
      pauseGame();
      break;

    case "Enter":
      moveGame();
      break;
  }
  drawBlock();
});

let playPause;
let gameSpeed = 1000;
function moveGame(e) {
  moveDown();
  drawBlock();
  playPause = setTimeout(moveGame, gameSpeed);
}
function pauseGame() {
  clearTimeout(playPause);
}

setTimeout(moveGame, gameSpeed);
