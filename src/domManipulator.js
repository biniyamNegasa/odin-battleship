export const renderBoard = (coordinates, domBoard, content, className) => {
  coordinates.forEach((_, rowCol) => {
    const [row, col] = rowCol.split(",").map((x) => parseInt(x));
    domBoard.rows[row].cells[col].textContent = content;
    if (className !== "") {
      domBoard.rows[row].cells[col].classList.add(className);
    }
  });
};

export function applyBorders(coordinates, domBoard) {
  if (coordinates.length === 0) return;

  let minX = Infinity,
    minY = Infinity,
    maxX = -Infinity,
    maxY = -Infinity;

  coordinates.forEach((rowCol) => {
    const [x, y] = rowCol.split(",").map((f) => parseInt(f));
    minX = Math.min(minX, x);
    minY = Math.min(minY, y);
    maxX = Math.max(maxX, x);
    maxY = Math.max(maxY, y);
  });

  coordinates.forEach((rowCol) => {
    const [x, y] = rowCol.split(",").map((f) => parseInt(f));
    let cell = domBoard.rows[x].cells[y];

    if (minX === maxX) {
      cell.classList.add("border-top", "border-bottom");

      if (y === minY) cell.classList.add("border-left");
      if (y === maxY) cell.classList.add("border-right");
    } else {
      cell.classList.add("border-left", "border-right");

      if (x === minX) cell.classList.add("border-top");
      if (x === maxX) cell.classList.add("border-bottom");
    }
  });
}
