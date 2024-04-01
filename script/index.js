const generateGrid = document.getElementById("generateGrid");
const canvas = document.getElementById("gridCanvas");
const addLayerBtn = document.getElementById("addLayer");

const gridCanvas = new GridCanvas(canvas);
const layer = new Layer();

canvas.addEventListener("contextmenu", function (event) {
  event.preventDefault();
});

document.addEventListener("DOMContentLoaded", () => {
  gridCanvas.drawGrid();
});

// colorPicker.addEventListener("change", (event) => {
//   // gridCanvas.setColor(event);
//   colorPalette.updateSelected();
// });

generateGrid.addEventListener("click", () => {
  gridCanvas.drawGrid();
});

function drawPixel() {
  gridCanvas.drawPixelListeners();
}

drawPixel();
addLayerBtn.addEventListener("click", layer.create);
