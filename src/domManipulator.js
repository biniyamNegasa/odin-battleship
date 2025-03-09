export const renderBoard = (coordinates, domBoard, content, className) => {
  coordinates.forEach((_, rowCol) => {
    const [row, col] = rowCol.split(",").map((x) => parseInt(x));
    domBoard.rows[row].cells[col].textContent = content;
    domBoard.rows[row].cells[col].classList.add(className);
  });
};
