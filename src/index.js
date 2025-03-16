import "./style.css";
import Player from "./player.js";
import GameBoard from "./gameboard.js";
import { removeBorders, applyBorders, renderBoard } from "./domManipulator.js";
import RandomizedSet from "./randomizedSet.js";

const humanPlayer = new Player(new GameBoard(), "human");
const computerPlayer = new Player(new GameBoard(), "computer");

const humanPlayerBoard = document.querySelector(".first-player-board table");
const computerPlayerBoard = document.querySelector(
  ".second-player-board table",
);
const randomizeButton = document.querySelector(".randomize-button");
const startButton = document.querySelector(".start-button");

let turn = 1;
const player = (turn) => (turn % 2 === 0 ? humanPlayer : computerPlayer);
const otherPlayerBoard = (turn) =>
  turn % 2 === 0 ? computerPlayerBoard : humanPlayerBoard;
let currentHumanNodeSet = allHumanNodes(humanPlayerBoard);
let temp = [];
let visited = new Set();
const drx = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];

function allHumanNodes(domBoard) {
  let result = new RandomizedSet();
  for (let row of domBoard.rows) {
    for (let cell of row.cells) {
      result.insert(cell);
    }
  }
  return result;
}

const addEventToBoard = (board, domBoard) => {
  const n = domBoard.rows.length;
  const m = domBoard.rows[0].cells.length;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      domBoard.rows[i].cells[j].addEventListener("click", () => {
        const currentOtherPlayerBoard = otherPlayerBoard(turn);

        board.receiveAttack(i, j);
        renderBoard(board.foundCoordinates, domBoard, "X", "red");

        if (!board.allShipCoordinates.has(i + "," + j)) {
          domBoard.classList.add("disabled-board");
          domBoard.classList.add("hidden");
          currentOtherPlayerBoard.classList.remove("disabled-board");
          currentOtherPlayerBoard.classList.remove("hidden");
          turn = 1 - turn;
        } else if (player(1 - turn).type === "computer") {
          for (let [dr, dc] of drx) {
            let [r, c] = [i + dr, j + dc];
            if (
              r >= 0 &&
              r < board.size &&
              c >= 0 &&
              c < board.size &&
              !visited.has(domBoard.rows[r].cells[c])
            ) {
              temp.push(domBoard.rows[r].cells[c]);
              currentHumanNodeSet.remove(domBoard.rows[r].cells[c]);
            }
          }
        }
        domBoard.rows[i].cells[j].classList.add("disabled");

        if (
          board.allShipCoordinates.has(i + "," + j) &&
          board.ships.get(board.allShipCoordinates.get(i + "," + j)).isSunk()
        ) {
          applyBorders(
            board.shipToCoordinates.get(
              board.allShipCoordinates.get(i + "," + j),
            ),
            domBoard,
          );
        }

        if (board.areAllShipsSunk()) {
          setTimeout(() => {
            alert("Game Over! The winner is " + player(1 - turn).type);
            if (confirm("Do you want to play again?")) {
              window.location.reload();
            } else {
              domBoard.classList.add("disabled-board");
              domBoard.classList.add("hidden");
            }
          }, 100);
        } else if (player(1 - turn).type === "computer") {
          setTimeout(() => {
            let node;
            if (temp.length > 0) {
              node = temp.pop();
            } else {
              node = currentHumanNodeSet.getRandom();
            }
            visited.add(node);
            node.click();
          }, 1000);
        }
      });
    }
  }
};

function shipPlacer(board) {
  const randomizedSet = new RandomizedSet();
  for (let i = 0; i < board.size; i++) {
    for (let j = 0; j < board.size; j++) {
      randomizedSet.insert(i + "," + j);
    }
  }

  for (let i = 0; i < board.numberOfShips; i++) {
    let randomRow = randomizedSet.getRandom();
    let [row, col] = randomRow.split(",").map((x) => parseInt(x));
    let first = Math.round(Math.random());

    while (
      !board.placeShip(row, col, first, i + 1) &&
      !board.placeShip(row, col, 1 - first, i + 1)
    ) {
      randomRow = randomizedSet.getRandom();
      [row, col] = randomRow.split(",").map((x) => parseInt(x));
      first = Math.round(Math.random());
    }
  }
}

randomizeButton.addEventListener("click", () => {
  humanPlayer.gameBoard.clear();
  removeBorders(humanPlayerBoard);

  shipPlacer(humanPlayer.gameBoard);
  renderBoard(
    humanPlayer.gameBoard.allShipCoordinates,
    humanPlayerBoard,
    "",
    "",
  );
  humanPlayer.gameBoard.shipToCoordinates.forEach((arr) => {
    applyBorders(arr, humanPlayerBoard);
  });
});

startButton.addEventListener("click", () => {
  const playerName = document.querySelector("#player-name");
  if (playerName.value !== "") humanPlayer.type = playerName.value;

  computerPlayerBoard.classList.remove("disabled-board");
  computerPlayerBoard.classList.remove("hidden");
  humanPlayerBoard.classList.add("hidden");

  startButton.remove();
  randomizeButton.remove();
  playerName.remove();
});

shipPlacer(humanPlayer.gameBoard);
addEventToBoard(humanPlayer.gameBoard, humanPlayerBoard);
humanPlayerBoard.classList.add("disabled-board");
renderBoard(humanPlayer.gameBoard.allShipCoordinates, humanPlayerBoard, "", "");

humanPlayer.gameBoard.shipToCoordinates.forEach((arr) => {
  applyBorders(arr, humanPlayerBoard);
});

shipPlacer(computerPlayer.gameBoard);
addEventToBoard(computerPlayer.gameBoard, computerPlayerBoard);
computerPlayerBoard.classList.add("disabled-board", "hidden");
renderBoard(
  computerPlayer.gameBoard.allShipCoordinates,
  computerPlayerBoard,
  "",
  "",
);
