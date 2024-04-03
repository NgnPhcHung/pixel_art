const DEFAULT_VALUE_GRID = 32;

class GridCanvas {
  #gridItemSize;
  #canvas;
  #ctx;
  #gridSize;
  #initialX;
  #initialY;
  #offsetX = 0;
  #offsetY = 0;
  #isDragging = false;
  #isDrawing = false;

  constructor(canvas) {
    this.#canvas = canvas;
    this.#gridSize = DEFAULT_VALUE_GRID;
    this.#gridItemSize = canvas.width / this.#gridSize;
    this.#ctx = canvas.getContext("2d");
    this.zoom = 1;
    this.center = {
      x: this.#canvas.width / 2,
      y: this.#canvas.height / 2,
    };
    this.offset = scale(this.center, -1);

    this.colorPalette = new ColorPalette();
    this.toolBar = new ToolBar();

    this.drawPixelListeners();
    this.initDrag();
    canvas.willReadFrequently = true;
  }
  initDrag() {
    this.#canvas.addEventListener(
      "mousedown",
      this.#handleMouseDown.bind(this)
    );

    this.#canvas.addEventListener("mouseup", this.#handleMouseUp.bind(this));

    this.#canvas.addEventListener(
      "mousemove",
      this.#handleMouseMove.bind(this)
    );
    this.#canvas.addEventListener("wheel", this.#handleMouseWheel.bind(this));
  }
  drawGrid() {
    const gridInputValue = document.getElementById("gridResolution").value;
    const addPaletteButton = document.getElementById("addPalette");

    this.#gridSize = parseInt(gridInputValue);
    this.#gridItemSize = this.#canvas.width / this.#gridSize;
    this.#ctx.clearRect(0, 0, this.#canvas.width, this.#canvas.height);
    new MainBackground(
      {
        selector: document.querySelector("#gridCanvas"),
      },
      640,
      this.#gridSize
    );

    if (!this.colorPalette.isGenerated) {
      addPaletteButton.addEventListener("click", this.colorPalette.addColor);
      this.colorPalette.load();
      this.colorPalette.isGenerated = true;
      this.toolBar.loadElement();
    }
  }
  fillCellColor(event) {
    const selectedColor = this.colorPalette.getSelectedColor();

    const rect = this.#canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    const gridX = Math.floor(mouseX / this.#gridItemSize);
    const gridY = Math.floor(mouseY / this.#gridItemSize);

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
  }
  #handleMouseMove(event) {
    if (this.#isDragging) {
      this.#offsetX = event.clientX - this.#initialX;
      this.#offsetY = event.clientY - this.#initialY;
      this.#canvas.style.transform = `translate(${this.#offsetX}px, ${
        this.#offsetY
      }px)`;
    }
    if (this.#isDrawing) {
      this.fillCellColor(event);
    }
  }
  #handleMouseDown(event) {
    if (event.button === 1) {
      this.#isDragging = true;
      this.#initialX = event.clientX - this.#offsetX;
      this.#initialY = event.clientY - this.#offsetY;
    }
    if (event.button === 0) {
      this.#isDrawing = true;
    }
  }
  #handleMouseUp() {
    this.#isDragging = false;
    this.#isDrawing = false;
  }
  #handleMouseWheel(event) {
    if (!event.ctrlKey) return;

    const delta = event.deltaY;
    const zoomSpeed = 0.1;
    const zoomFactor = delta > 0 ? 1 + zoomSpeed : 1 - zoomSpeed;

    const mouseX = event.clientX - this.center.x;
    const mouseY = event.clientY - this.center.y;

    this.zoom *= zoomFactor;

    const newWidth = this.#canvas.width * zoomFactor;
    const newHeight = this.#canvas.height * zoomFactor;

    this.#canvas.width = newWidth;
    this.#canvas.height = newHeight;

    this.offset.x = mouseX * (1 - zoomFactor) + this.offset.x;
    this.offset.y = mouseY * (1 - zoomFactor) + this.offset.y;

    this.#gridItemSize = this.#canvas.width / this.#gridSize;

    new MainBackground(
      {
        selector: document.querySelector("#gridCanvas"),
      },
      this.#canvas.width,
      this.#gridSize
    );

    event.preventDefault();
  }

  #getMouse(evt) {
    const rect = this.#canvas.getBoundingClientRect();
    const mouseX = (evt.clientX - rect.left - this.#offsetX) / this.zoom;
    const mouseY = (evt.clientY - rect.top - this.#offsetY) / this.zoom;

    const px = Math.round(
      mouseX + this.center.x - rect.width / (2 * this.zoom) - this.#offsetX
    );
    const py = Math.round(
      mouseY + this.center.y - rect.height / (2 * this.zoom) - this.#offsetY
    );

    return { px, py };
  }
}
