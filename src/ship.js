export default class Ship {
  #length;
  #hitCount;

  constructor(length) {
    this.#length = length;
    this.#hitCount = 0;
  }
  get length() {
    return this.#length;
  }
  get hitCount() {
    return this.#hitCount;
  }

  hit() {
    if (!this.isSunk()) {
      this.#hitCount++;
    }
  }
  isSunk() {
    return this.#hitCount >= this.#length;
  }
}
