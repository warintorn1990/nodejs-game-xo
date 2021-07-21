const prompt = require("prompt");

var board = {
  1: " ",
  2: " ",
  3: " ",
  4: " ",
  5: " ",
  6: " ",
  7: " ",
  8: " ",
  9: " ",
};
var endGame = 0;
var space_board = [];
var winCombinations = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];

function checkWin(player) {
  for (var i = 0; i < winCombinations.length; i++) {
    var markCount = 0;
    for (j = 0; j < winCombinations[i].length; j++) {
      if (board[winCombinations[i][j]] === player) {
        markCount++;
      }
      if (markCount === 3) {
        return true;
      }
    }
  }
  return false;
}

function markBoard(position, mark) {
  board[position] = mark.toUpperCase();
  printBoard();
}

function printBoard() {
  console.log(
    "\n" +
      " " +
      board[1] +
      " | " +
      board[2] +
      " | " +
      board[3] +
      "\n" +
      " ---------\n" +
      " " +
      board[4] +
      " | " +
      board[5] +
      " | " +
      board[6] +
      "\n" +
      " ---------\n" +
      " " +
      board[7] +
      " | " +
      board[8] +
      " | " +
      board[9] +
      "\n"
  );
}

const checkStateGame = () => {
  space_board = [];
  endGame = 0;
  for (const property in board) {
    if (board[property] == " ") {
      space_board.push(parseInt(property));
      endGame++;
    }
  }

  if (endGame == 0) {
    return true;
  } else {
    return false;
  }
};

function player_ai_turn() {
  console.log("==== AUTOBOT ====");
  let random = Math.floor(Math.random() * space_board.length);
  const randomBoard = space_board[random];
  markBoard(randomBoard.toString(), "O");
}

const playgame = (result) => {
  console.log("====  YOU ====");
  markBoard(result.position, "X");
};

const gameStart = () => {
  console.log("gameStart");
  prompt.start();
  prompt.get(["position"], function (err, result) {
    playgame(result);

    if (checkWin("X") == true) {
      console.log("You WIN");
      return;
    }

    if (checkStateGame() == true) {
      console.log("End Game");
      return;
    }

    player_ai_turn();
    gameStart("X");
  });
};

gameStart();
