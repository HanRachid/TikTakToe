// Matrix handling

let someMatrix = [];
let playableCells = [];
let playedCells = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];
let a = 0;
let b = 0;
const matrixToPos = (number) => {
  const congr = Math.floor((number - 1) / 3);
  return [congr, number - congr * 3];
};
const arraytoNumbers = (number) => {
  a = matrixToPos(number)[0];
  b = matrixToPos(number)[1] - 1;
};
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const generateArray = () => {
  for (let i = 0; i < 9; i++) {
    playableCells.push(i + 1);
  }
};

generateArray();

const randomFromArray = () => {
  return playableCells[getRandomInt(playableCells.length)];
};

const removeFromIndex = (index) => {
  let tempPlayableCells = [];
  for (let i = 0; i < playableCells.length; i++) {
    if (i != index) {
      tempPlayableCells.push(playableCells[i]);
    }
  }
  playableCells = tempPlayableCells;
};

const removeByElement = (number) => {
  let tempPlayableCells = [];
  for (let i = 0; i < playableCells.length; i++) {
    if (number != playableCells[i]) {
      tempPlayableCells.push(playableCells[i]);
    }
  }
  playableCells = tempPlayableCells;
};

const resetArray = () => {
  playableCells = [];
  generateArray();
};

const setMatrix = (number) => {
  someMatrix[0] = [number, number, number];
  someMatrix[1] = [number, number, number];
  someMatrix[2] = [number, number, number];
  return "the 3x3 matrix was filled with the number " + number;
};

const showMatrix = () => {
  let fullmatrix = "";
  for (let j = 0; j < 3; j++) {
    let rowstr = "";
    for (let i = 0; i < 3; i++) {
      if (i === 2) {
        rowstr += someMatrix[b][i];
      } else {
        rowstr += someMatrix[b][i] + ", ";
      }
    }
    fullmatrix += rowstr + "\n";
  }
  return "" + fullmatrix;
};

const editMatrix = (row, column, newValue) => {
  someMatrix[row][column] = newValue;
};
//functions

//--computerplays
const computerPlay = () => {
  compPlay = randomFromArray();
  removeByElement(compPlay);
  return compPlay;
};
//--Puts marker in div, change class name to "clicked"

const tictacClick = (element, isHuman) => {
  element.className = "clicked";
  if (isHuman) {
    element.innerText = "X";
    console.log(element.childNodes[0]);
  } else {
    element.innerText = "O";
    console.log(element.innerText);
  }
};

// eventlisteners
let compPlay = 0;
const comprPlay = document.querySelector(".cell" + compPlay);
const numberClick = document.querySelectorAll("#grid>div");
const resetGame = document.querySelector(".reset");

// for (element in numberClickArray) {
//   element.addEventListener("click", startGame(element));
// }

// const startGame = () => {
//   console.log("works");
// };

clickedCell = 0;

isOver = false;
col_sum = [0, 0, 0];
row_sum = [0, 0, 0];
diag_sum = [0, 0, 0];
const node = document.createElement("div");
const button = document.createElement("button");
button.textContent = "Replay";

button.addEventListener("click", () => {
  let i = 1;
  for (const element of numberClick) {
    reset(element, i);
    element.innerHTML = "";
    console.log(element.className);
    i++;
  }
  node.textContent = "";
  document.body.removeChild(node);

  document.body.removeChild(button);
  col_sum = [0, 0, 0];
  row_sum = [0, 0, 0];
  diag_sum = [0, 0, 0];
  playedCells = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];
});

const checkWin = (number) => {
  if (number == 1) {
    const textnode = document.createTextNode("The winner is You ! ");

    node.appendChild(textnode);
    isOver = true;
    document.body.appendChild(node);
    document.body.appendChild(button);
  }
  if (number == -1) {
    const textnode = document.createTextNode(
      "The winner is the computer (what a noob) ! "
    );
    isOver = true;
    node.appendChild(textnode);
    document.body.appendChild(node);
    document.body.appendChild(button);
  }
  if (number == 0 && playableCells.length == 0) {
    const textnode = document.createTextNode("Draw! ");
    isOver = true;
    node.appendChild(textnode);
    document.body.appendChild(node);
    document.body.appendChild(button);
  }
};

const fillCell = (number) => {
  playedCells[a][b] = number;
  col_sum[a] += number;
  if (Math.abs(col_sum[a]) == 3) return checkWin(number);

  row_sum[b] += number;
  if (Math.abs(row_sum[b]) == 3) return checkWin(number);

  if (a == b) {
    diag_sum[0] += number;
    if (Math.abs(diag_sum[0]) == 3) return checkWin(number);
  }

  // anti diagonal
  if (a + b == 2) {
    diag_sum[1] += number;
    if (Math.abs(diag_sum[1]) == 3) return checkWin(number);
  }

  return checkWin(0);
};
for (const element of numberClick) {
  element.addEventListener("click", () => {
    if (element.className !== "clicked") {
      // clicked cell number by number
      if (!isOver) {
        let cellNumber = element.className.replace("cell", "");
        arraytoNumbers(cellNumber);
        removeByElement(cellNumber);
        fillCell(1);
        // checkWin("human");
        tictacClick(element, true);
        // clicked cell number by computer

        let computerCell = computerPlay();

        arraytoNumbers(computerCell);
        fillCell(-1);

        const comprPlay = document.querySelector(".cell" + computerCell);

        console.log("truuu");
        setTimeout(tictacClick, 300, comprPlay, false);
        console.log(playedCells);
      }
    }
  });
}

const reset = (element, pos) => {
  element.className = "cell" + pos;
  resetArray();
  isOver = false;
};

computerClick = () => {
  console.log("works");
};
