
const generateGrid = document.getElementById("generateGrid");
const addLayerBtn = document.getElementById("addLayer");

const gridCanvas = new GridCanvas();
const layer = new Layer();

document.addEventListener(
  "mousedown",
  function (event) {
    if (event.detail > 1) {
      event.preventDefault();
    }
  },
  false
);
window.addEventListener(
  "wheel",
  function (event) {
    if (event.ctrlKey === true) {
      event.preventDefault();
    }
  },
  { passive: false }
);

function createCustomCursor() {
  const cursor = document.createElement("div");
  cursor.classList.add("customCursor");
  cursor.setAttribute("tool-data", "pencil");
  document.body.appendChild(cursor);

  document.addEventListener("mousemove", function (e) {
    cursor.style.left = e.pageX + "px";
    cursor.style.top = e.pageY + "px";
  });
}

document.addEventListener("DOMContentLoaded", () => {
  gridCanvas.drawGrid();
  const layerManagement = new LayerManagement()
  layerManagement.addLayer("gridCanvas")
  const rightPanel = document.getElementById("rightPanel");
  const collapseButton = document.getElementById("collapseButton");

  collapseButton.addEventListener("click", function () {
    rightPanel.classList.toggle("collapsed");
  });
  createCustomCursor();
});

generateGrid.addEventListener("click", () => {
  gridCanvas.drawGrid();
});

addLayerBtn.addEventListener("click", layer.create);
