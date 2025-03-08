export default class Player {
  #type;
  #gameBoard;

  constructor(gameBoard, type = "real") {
    this.#gameBoard = gameBoard;
    this.#type = type;
  }

  get type() {
    return this.#type;
  }
  get gameBoard() {
    return this.#gameBoard;
  }
}
