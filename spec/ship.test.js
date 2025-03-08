import Ship from "../src/ship.js";

describe("Ship", () => {
  it("should have a length", () => {
    const ship = new Ship(10);
    expect(ship.length).toBe(10);
  });

  it("should have a hitCount", () => {
    const ship = new Ship(10);
    expect(ship.hitCount).toBe(0);
  });

  it("should have a hit method", () => {
    const ship = new Ship(10);
    expect(ship.hit).toBeDefined();
  });

  it("should have a isSunk method", () => {
    const ship = new Ship(10);
    expect(ship.isSunk).toBeDefined();
  });

  it("should have a hitCount", () => {
    const ship = new Ship(10);
    expect(ship.hitCount).toBe(0);
  });

  it("should increase the hitCount after hit", () => {
    const ship = new Ship(10);
    ship.hit();
    expect(ship.hitCount).toBe(1);
  });

  it("should not be sunk if the hitCount is less than the length", () => {
    const ship = new Ship(10);
    expect(ship.isSunk()).toBe(false);
  });

  it("should be sunk if the hitCount is equal to the length", () => {
    const ship = new Ship(10);
    for (let i = 0; i < 10; i++) {
      ship.hit();
    }
    expect(ship.isSunk()).toBe(true);
  });

  it("should be sunk if the hitCount is greater than the length", () => {
    const ship = new Ship(10);
    for (let i = 0; i < 11; i++) {
      ship.hit();
    }
    expect(ship.isSunk()).toBe(true);
  });
});
