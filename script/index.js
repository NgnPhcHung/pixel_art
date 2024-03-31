const colorPicker = document.getElementById("colorPicker");
const generateGrid = document.getElementById("generateGrid");
const canvas = document.getElementById("gridCanvas");
const addLayerBtn = document.getElementById("addLayer");

const colorValue = colorPicker.value;
const gridCanvas = new GridCanvas(canvas, colorValue);
const layer = new Layer();

document.addEventListener("DOMContentLoaded", () => {
  gridCanvas.drawGrid();
});

colorPicker.addEventListener("change", (event) => {
  gridCanvas.setColor(event);
});

generateGrid.addEventListener("click", () => {
  gridCanvas.drawGrid();
});

function drawPixel() {
  gridCanvas.drawPixelListeners();
}

drawPixel();
addLayerBtn.addEventListener("click", layer.create);
