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

  // Get references to elements
  const rightPanel = document.getElementById("rightPanel");
  const collapseButton = document.getElementById("collapseButton");

  // Add click event listener to collapse button
  collapseButton.addEventListener("click", function () {
    // Toggle collapse class on rightPanel
    rightPanel.classList.toggle("collapsed");
  });
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
