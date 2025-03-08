export default class Ship {
  constructor(length) {
    this.length = length;
    this.hitCount = 0;
  }
  hit() {
    if (!this.isSunk()) {
      this.hitCount++;
    }
  }
  isSunk() {
    return this.hitCount >= this.length;
  }
}
