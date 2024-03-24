const DEFAULT_VALUE_GRID = 32;

class GridCanvas {
  isDraggable;
  #gridItemSize;
  #canvas;
  #ctx;
  #color;
  #gridSize;

  constructor(canvas, color) {
    this.#canvas = canvas;
    this.#gridItemSize = canvas.width / this.#gridSize;
    this.#ctx = canvas.getContext("2d");
    this.#color = color;

    this.#gridSize = DEFAULT_VALUE_GRID;

    this.isDraggable = false;
  }

  drawGrid() {
    const gridInputValue = document.getElementById("gridResolution").value;
    this.#gridSize = parseInt(gridInputValue);

    this.#gridItemSize = this.#canvas.width / this.#gridSize;
    this.#ctx.clearRect(0, 0, this.#canvas.width, this.#canvas.height);
  }

  fillCellColor(event) {
    var rect = this.#canvas.getBoundingClientRect();
    var mouseX = event.clientX - rect.left;
    var mouseY = event.clientY - rect.top;

    var gridX = Math.floor(mouseX / this.#gridItemSize);
    var gridY = Math.floor(mouseY / this.#gridItemSize);

    this.#ctx.fillStyle = this.#color;
    this.#ctx.fillRect(
      gridX * this.#gridItemSize,
      gridY * this.#gridItemSize,
      this.#gridItemSize,
      this.#gridItemSize
    );
  }

  setColor = (event) => {
    colorPicker.style.backgroundColor = event.target.value;
    this.#color = event.target.value;
  };
}
