import Ship from "./ship.js";

export default class GameBoard {
  #allShipCoordinates;
  #foundCoordinates;
  #missedCoordinates;
  #ships;
  #size;

  constructor(numberOfShips = 5) {
    this.#ships = new Map();
    this.#allShipCoordinates = new Map();
    this.#foundCoordinates = new Set();
    this.#missedCoordinates = new Set();
    this.#size = 10;

    for (let i = 0; i < numberOfShips; i++) {
      this.#ships.set(i + 1, new Ship(i + 1));
    }
  }

  get allShipCoordinates() {
    return this.#allShipCoordinates;
  }

  get foundCoordinates() {
    return this.#foundCoordinates;
  }
  get missedCoordinates() {
    return this.#missedCoordinates;
  }

  placeShip(row, col, horizontal, shipLength) {
    if (!this.#ableToAllocateThisShip(row, col, horizontal, shipLength)) {
      return false;
    }
    for (let i = 0; i < shipLength; i++) {
      const currKey = `${row},${col}`;
      this.#allShipCoordinates.set(currKey, shipLength);
      horizontal ? col++ : row++;
    }
    return true;
  }
  receiveAttack(row, col) {
    const currKey = `${row},${col}`;
    if (
      this.#foundCoordinates.has(currKey) ||
      this.#missedCoordinates.has(currKey)
    ) {
      return false;
    }

    if (this.#allShipCoordinates.has(currKey)) {
      this.#ships.get(this.#allShipCoordinates.get(currKey)).hit();
      this.#foundCoordinates.add(currKey);
    } else {
      this.#missedCoordinates.add(currKey);
    }
    return true;
  }
  areAllShipsSunk() {
    return this.allShipCoordinates.size === this.foundCoordinates.size;
  }

  #ableToAllocateThisShip(row, col, horizontal, shipLength) {
    for (let i = 0; i < shipLength; i++) {
      const currKey = `${row},${col}`;
      if (!this.#inbound(row, col, currKey)) {
        return false;
      }
      horizontal ? col++ : row++;
    }
    return true;
  }

  #inbound(row, col, currKey) {
    return !(
      this.#allShipCoordinates.has(currKey) ||
      col >= this.#size ||
      row >= this.#size
    );
  }
}
