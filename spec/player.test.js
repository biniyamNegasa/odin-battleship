import Player from "../src/player.js";
import GameBoard from "../src/gameboard.js";

describe("Player", () => {
  it("should have a gameBoard", () => {
    const gameBoard = new GameBoard();
    const player = new Player(gameBoard);
    expect(player.gameBoard).toBe(gameBoard);
  });

  it("should have a type", () => {
    const gameBoard = new GameBoard();
    const player = new Player(gameBoard, "computer");
    expect(player.type).toBe("computer");
  });
  it("should have a default type of real", () => {
    const gameBoard = new GameBoard();
    const player = new Player(gameBoard);
    expect(player.type).toBe("real");
  });
});
