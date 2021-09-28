// Game structure

let main = document.querySelector(".tetris");
let score = 0;
let scoreElem = document.querySelector(".score");
let levelElem = document.querySelector(".level");

let currentLevel = 1;
let posLevel = {
  1: {
    scorePerLine: 10,
    speed: 400,
    nextLevelScore: 20,
  },
  2: {
    scorePerLine: 15,
    speed: 300,
    nextLevelScore: 120,
  },
  3: {
    scorePerLine: 30,
    speed: 200,
    nextLevelScore: 150,
  },
	43: {
    scorePerLine: 40,
    speed: 100,
    nextLevelScore: 160,
  },
	5: {
    scorePerLine: 50,
    speed: 50,
    nextLevelScore: 2500,
  },
};
let playfield = [
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
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

let activeBlock = {
  column: 0,
  row: 3,
  figur: [
    [0, 1, 1, 0],
    [0, 1, 1, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
};

let figures = {
  O: [
    [1, 1],
    [1, 1],
  ],
  Z: [
    [1, 1, 0],
    [0, 1, 1],
    [0, 0, 0],
  ],
  S: [
    [0, 1, 1],
    [1, 1, 0],
    [0, 0, 0],
  ],
  L: [
    [1, 0, 0],
    [1, 1, 1],
    [0, 0, 0],
  ],
  J: [
    [0, 0, 1],
    [1, 1, 1],
    [0, 0, 0],
  ],
  T: [
    [0, 1, 0],
    [1, 1, 1],
    [0, 0, 0],
  ],
  I: [
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0],
  ],
};

// add Active blocks
function addActiveBlock() {
  removeActiveBlock();
  for (let column = 0; column < activeBlock.figur.length; column++) {
    for (let row = 0; row < activeBlock.figur[column].length; row++) {
      if (activeBlock.figur[column][row] === 1) {
        playfield[activeBlock.column + column][activeBlock.row + row] =
          activeBlock.figur[column][row];
      }
    }
  }
}

// rotate blocks

function rotateBlock() {
  const prevBlockState = activeBlock.figur;
  activeBlock.figur = activeBlock.figur[0].map((val, ind) =>
    activeBlock.figur.map((el) => el[ind]).reverse()
  );

  if (hasCollisions()) {
    activeBlock.figur = prevBlockState;
  }
}

// radom blocks

function randomBlocks() {
  const randomFigures = "IOLJTSZ";
  const rand = Math.floor(Math.random() * 7);
  return figures[randomFigures[rand]];
}

// remove Active blocks
function removeActiveBlock() {
  for (let column = 0; column < playfield.length; column++) {
    for (let row = 0; row < playfield[column].length; row++) {
      if (playfield[column][row] === 1) {
        playfield[column][row] = 0;
      }
    }
  }
}

// check blocks
function hasCollisions() {
  for (let column = 0; column < activeBlock.figur.length; column++) {
    for (let row = 0; row < activeBlock.figur[column].length; row++) {
      if (
        activeBlock.figur[column][row] &&
        (playfield[activeBlock.column + column] == undefined ||
          playfield[activeBlock.column + column][activeBlock.row + row] ===
            undefined ||
          playfield[activeBlock.column + column][activeBlock.row + row] === 2)
      ) {
        return true;
      }
    }
  }
  return false;
}
// create blocks
function drawBlock() {
  let mainInner = "";
  for (let column = 0; column < playfield.length; column++) {
    for (let row = 0; row < playfield[column].length; row++) {
      if (playfield[column][row] === 1) {
        mainInner += '<div class = "block movingBlock"></div>';
      } else if (playfield[column][row] === 2) {
        mainInner += '<div class = "block fixedBlock"></div>';
      } else {
        mainInner += '<div class = "block"></div>';
      }
    }
  }
  main.innerHTML = mainInner;
}

// fixing block
function fixedBlock() {
  for (let column = 0; column < playfield.length; column++) {
    for (let row = 0; row < playfield[column].length; row++) {
      if (playfield[column][row] === 1) {
        playfield[column][row] = 2;
      }
    }
  }

  checkLines();
}

// chekck lines
function checkLines() {
  let removeLine = true;
  let fieldLines = 0;
  for (let column = 0; column < playfield.length; column++) {
    for (let row = 0; row < playfield[column].length; row++) {
      if (playfield[column][row] !== 2) {
        removeLine = false;
        break;
      }
    }
    if (removeLine) {
      playfield.splice(column, 1);
      playfield.splice(0, 0, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
      fieldLines += 1;
    }
    removeLine = true;
  }
  switch (fieldLines) {
    case 1:
      score += 10;
      break;
    case 2:
      score += 10 * 3;
      break;
    case 3:
      score += 10 * 6;
      break;
    case 4:
      score += 10 * 12;
      break;
  }

  scoreElem.innerHTML = score;
  if (score >= posLevel[currentLevel].nextLevelScore) {
    currentLevel++;
		levelElem.innerHTML = currentLevel
  }
}

function moveBlocksDown() {
  activeBlock.column += 1;
  if (hasCollisions()) {
    activeBlock.column -= 1;
    fixedBlock();
    removeActiveBlock();
    activeBlock.figur = randomBlocks();
    activeBlock.row = Math.floor((10 - activeBlock.figur[0].length) / 2);
    activeBlock.column = 0;
  }
}

// ArrowUp
// ArrowLeft
// ArrowRight
// ArrowDown

// arrow buttons
document.addEventListener("keydown", function (e) {
  switch (e.key) {
    case "ArrowRight":
      console.log("Right");
      activeBlock.row += 1;
      if (hasCollisions()) {
        activeBlock.row -= 1;
      }
      break;

    case "ArrowLeft":
      console.log("Left");
      activeBlock.row -= 1;
      if (hasCollisions()) {
        activeBlock.row += 1;
      }
      break;

    case "ArrowDown":
      console.log("Down");
      moveBlocksDown();
      break;

    case "ArrowUp":
      console.log("Up");
      rotateBlock();
      break;

    case " ":
      console.log("Pause");
      pauseGame();
      break;

    case "Enter":
      moveGame();
      break;
  }
  addActiveBlock();
  drawBlock();
});

scoreElem.innerHTML = score;
levelElem.innerHTML = currentLevel;

addActiveBlock();
drawBlock();

// timer
let playPause;

function startGame() {
  moveBlocksDown();
  addActiveBlock();
  drawBlock();
  playPause = setTimeout(startGame, posLevel[currentLevel].speed);
}
function pauseGame() {
  clearTimeout(playPause);
}

setTimeout(startGame, posLevel[currentLevel].speed);
