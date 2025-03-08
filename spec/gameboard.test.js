import GameBoard from "../src/gameboard.js";

describe("GameBoard", () => {
  describe("placeShip", () => {
    it("should place a ship horizontally", () => {
      const gameBoard = new GameBoard();
      expect(gameBoard.placeShip(0, 0, true, 1)).toBe(true);
      expect(gameBoard.allShipCoordinates.size).toBe(1);
    });

    it("should place a ship vertically", () => {
      const gameBoard = new GameBoard();
      expect(gameBoard.placeShip(0, 0, false, 1)).toBe(true);
      expect(gameBoard.allShipCoordinates.size).toBe(1);
    });

    it("should not place a ship if the coordinates are occupied", () => {
      const gameBoard = new GameBoard();
      expect(gameBoard.placeShip(0, 0, true, 2)).toBe(true);
      expect(gameBoard.placeShip(0, 0, true, 1)).toBe(false);
      expect(gameBoard.allShipCoordinates.size).toBe(2);
    });

    it("should not place a ship if there is another ship along the path", () => {
      const gameBoard = new GameBoard();
      expect(gameBoard.placeShip(0, 4, false, 5)).toBe(true);
      expect(gameBoard.placeShip(0, 2, true, 4)).toBe(false);
      expect(gameBoard.allShipCoordinates.size).toBe(5);
    });

    it("should not place a ship if the length of the ship is greater than the available space on the board", () => {
      const gameBoard = new GameBoard();
      expect(gameBoard.placeShip(0, 6, true, 5)).toBe(false);
      expect(gameBoard.allShipCoordinates.size).toBe(0);
    });
  });
  describe("receiveAttack", () => {
    it("should receive an attack", () => {
      const gameBoard = new GameBoard();
      gameBoard.placeShip(0, 0, true, 1);
      expect(gameBoard.receiveAttack(0, 0)).toBe(true);
    });
    it("should receive an attack even if there is no ship there", () => {
      const gameBoard = new GameBoard();
      expect(gameBoard.receiveAttack(0, 0)).toBe(true);
    });
    it("should not receive an attack if it has already been attacked there", () => {
      const gameBoard = new GameBoard();
      expect(gameBoard.receiveAttack(0, 0)).toBe(true);
      expect(gameBoard.receiveAttack(0, 0)).toBe(false);
      expect(gameBoard.receiveAttack(0, 0)).toBe(false);
    });
  });
  describe("areAllShipsSunk", () => {
    it("should return true if all ships are sunk", () => {
      const gameBoard = new GameBoard();
      for (let i = 0; i < 5; i++) {
        gameBoard.placeShip(0, i, false, i + 1);
        for (let j = 0; j < i + 1; j++) {
          gameBoard.receiveAttack(j, i);
        }
      }
      expect(gameBoard.areAllShipsSunk()).toBe(true);
    });
    it("should return false if not all ships are sunk", () => {
      const gameBoard = new GameBoard();
      for (let i = 0; i < 5; i++) {
        gameBoard.placeShip(0, i, false, i + 1);
        gameBoard.receiveAttack(0, i);
      }
      expect(gameBoard.areAllShipsSunk()).toBe(false);
    });
  });
});
