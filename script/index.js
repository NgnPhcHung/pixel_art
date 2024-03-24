const colorPicker = document.getElementById("colorPicker");
const generateGrid = document.getElementById("generateGrid");
const canvas = document.getElementById("gridCanvas");

const colorValue = colorPicker.value;
const gridCanvas = new GridCanvas(canvas, colorValue);

document.addEventListener("DOMContentLoaded", () => {
  gridCanvas.drawGrid();
});

colorPicker.addEventListener("change", (event) => {
  gridCanvas.setColor(event);
});

generateGrid.addEventListener("click", () => {
  gridCanvas.drawGrid();
});

canvas.addEventListener("click", (event) => {
  gridCanvas.fillCellColor(event);
});

canvas.addEventListener("mousedown", () => {
  gridCanvas.isDraggable = true;
});
canvas.addEventListener("mouseup", () => {
  gridCanvas.isDraggable = false;
});
canvas.addEventListener("mousemove", (event) => {
  if (gridCanvas.isDraggable) {
    gridCanvas.fillCellColor(event);
  }
});
