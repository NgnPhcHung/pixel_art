const DEFAULT_VALUE_GRID = 32;

class GridCanvas {
  #gridItemSize;
  #canvas;
  #ctx;
  #gridSize;
  initialX;
  initialY;
  offsetX = 0;
  offsetY = 0;

  constructor(canvas) {
    this.#canvas = canvas;
    this.#gridItemSize = canvas.width / this.#gridSize;
    this.#ctx = canvas.getContext("2d");

    this.#gridSize = DEFAULT_VALUE_GRID;
    this.colorPalette = new ColorPalette();
  }

  drawGrid() {
    const gridInputValue = document.getElementById("gridResolution").value;
    const addPaletteButton = document.getElementById("colorMenu");

    this.#gridSize = parseInt(gridInputValue);

    this.#gridItemSize = this.#canvas.width / this.#gridSize;
    this.#ctx.clearRect(0, 0, this.#canvas.width, this.#canvas.height);

    if (!this.colorPalette.isGenerated) {
      addPaletteButton.addEventListener("click", this.colorPalette.addColor);
      this.colorPalette.load();
      this.colorPalette.isGenerated = true;
    }
  }

  fillCellColor(event) {
    const selectedColor = this.colorPalette.getSelectedColor();

    const rect = this.#canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    const gridX = Math.floor(mouseX / this.#gridItemSize);
    const gridY = Math.floor(mouseY / this.#gridItemSize);

    console.log(selectedColor);

    this.#ctx.fillStyle = selectedColor;
    this.#ctx.fillRect(
      gridX * this.#gridItemSize,
      gridY * this.#gridItemSize,
      this.#gridItemSize,
      this.#gridItemSize
    );
  }

  drawPixelListeners() {
    this.#canvas.addEventListener("click", (event) => {
      event.preventDefault();

      if (event.button === 0) {
        this.fillCellColor(event);
      }
    });

    this.#canvas.addEventListener("mousedown", (event) => {
      if (event.button === 0) {
        this.isDragging = true;
      }
    });
    this.#canvas.addEventListener("mouseup", (event) => {
      if (event.button === 0) {
        this.isDragging = false;
      }
    });

    this.#canvas.addEventListener("mousemove", (event) => {
      if (this.isDragging && event.button === 0) {
        this.fillCellColor(event);
      }
    });
  }
}
