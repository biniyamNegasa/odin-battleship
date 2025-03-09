import "./style.css";
import Player from "./player.js";
import GameBoard from "./gameboard.js";
import { renderBoard } from "./domManipulator.js";

const humanPlayer = new Player(new GameBoard(), "human");
const computerPlayer = new Player(new GameBoard(), "computer");

const humanPlayerBoard = document.querySelector(".first-player-board table");
const computerPlayerBoard = document.querySelector(
  ".second-player-board table",
);

let turn = 1;
const player = (turn) => (turn % 2 === 0 ? humanPlayer : computerPlayer);
const otherPlayerBoard = (turn) =>
  turn % 2 === 0 ? computerPlayerBoard : humanPlayerBoard;

const addEventToBoard = (board, domBoard) => {
  const n = domBoard.rows.length;
  const m = domBoard.rows[0].cells.length;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      domBoard.rows[i].cells[j].addEventListener("click", () => {
        const currentOtherPlayerBoard = otherPlayerBoard(turn);

        board.receiveAttack(i, j);
        renderBoard(board.foundCoordinates, domBoard, "X", "red");

        domBoard.classList.add("disabled-board");
        currentOtherPlayerBoard.classList.remove("disabled-board");

        domBoard.rows[i].cells[j].classList.add("disabled");

        turn = 1 - turn;
        if (board.areAllShipsSunk()) {
          setTimeout(() => {
            alert("Game Over! The winner is " + player(turn).type);
            if (confirm("Do you want to play again?")) {
              window.location.reload();
            } else {
              currentOtherPlayerBoard.classList.add("disabled-board");
            }
          }, 100);
        }
      });
    }
  }
};

for (let i = 0; i < 10; i += 2) {
  humanPlayer.gameBoard.placeShip(i, 0, true, i / 2 + 1);
}

addEventToBoard(humanPlayer.gameBoard, humanPlayerBoard);
humanPlayerBoard.classList.add("disabled-board");
renderBoard(
  humanPlayer.gameBoard.allShipCoordinates,
  humanPlayerBoard,
  "",
  "blue",
);

for (let i = 0; i < 10; i += 2) {
  computerPlayer.gameBoard.placeShip(0, i, false, i / 2 + 1);
}

addEventToBoard(computerPlayer.gameBoard, computerPlayerBoard);
renderBoard(
  computerPlayer.gameBoard.allShipCoordinates,
  computerPlayerBoard,
  "",
  "",
);
