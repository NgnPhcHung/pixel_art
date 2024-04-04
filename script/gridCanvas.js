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
  #filledCells = [];
  #currentCell = { x: undefined, y: undefined };

  constructor(canvas) {
    this.#canvas = canvas;
    this.#gridSize = DEFAULT_VALUE_GRID;
    this.#gridItemSize = canvas.width / this.#gridSize;
    this.#ctx = this.#canvas.getContext("2d");
    this.zoom = 1;
    this.center = {
      x: this.#canvas.width / 2,
      y: this.#canvas.height / 2,
    };
    this.offset = scale(this.center, -1);

    this.colorPalette = new ColorPalette();
    this.toolBar = new ToolBar();

    // this.drawPixelListeners();
    this.initDrag();
    canvas.willReadFrequently = true;
    this.getMouse = this.#getMouse.bind(this);
    this.getTool = this.#getTool.bind(this);
    this.setNewCell = this.#setNewCell.bind(this);
    this.isSameCord = this.#isSameCord.bind(this);
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
    this.#canvas.addEventListener("click", this.#handleMouseClick.bind(this));
    this.#canvas.addEventListener("wheel", this.#handleMouseWheel.bind(this));
  }
  drawGrid() {
    const gridInputValue = document.getElementById("gridResolution").value;
    const addPaletteButton = document.getElementById("addPalette");

    this.#gridSize = parseInt(gridInputValue);
    this.#gridItemSize = this.#canvas.width / this.#gridSize;
    this.#ctx.clearRect(0, 0, this.#canvas.width, this.#canvas.height);
    this.#createBackground();

    if (!this.colorPalette.isGenerated) {
      addPaletteButton.addEventListener("click", this.colorPalette.addColor);
      this.colorPalette.load();
      this.colorPalette.isGenerated = true;
      this.toolBar.loadElement();
    }
  }

  #handleMouseClick(event) {
    event.preventDefault();
    this.getTool(event);
  }
  #handleMouseMove(event) {
    if (this.#isDragging) {
      this.#offsetX = event.clientX - this.#initialX;
      this.#offsetY = event.clientY - this.#initialY;
      this.#canvas.style.transform = `translate(${this.#offsetX}px, ${
        this.#offsetY
      }px)`;
    } else if (this.#isDrawing) {
      this.getTool(event);
    }
  }
  #handleMouseDown(event) {
    if (event.button === 1) {
      this.#isDragging = true;
      this.#initialX = event.clientX - this.#offsetX;
      this.#initialY = event.clientY - this.#offsetY;
    }
    if (event.button === 0) {
      this.setNewCell(event);
      this.#isDrawing = true;
    }
  }
  #handleMouseUp() {
    this.#isDragging = false;
    this.#isDrawing = false;
    this.#currentCell.x = undefined;
    this.#currentCell.y = undefined;
  }

  #handleMouseWheel(event) {
    if (!event.ctrlKey) return;

    const delta = event.deltaY;
    const zoomSpeed = 0.1;
    const zoomFactor = delta > 0 ? 1 + zoomSpeed : 1 - zoomSpeed;

    const mouseX = event.clientX - this.center.x;
    const mouseY = event.clientY - this.center.y;

    const oldZoom = this.zoom;
    this.zoom *= zoomFactor;

    const newWidth = this.#canvas.width * zoomFactor;
    const newHeight = this.#canvas.height * zoomFactor;

    const zoomRatioX = mouseX / (this.#canvas.width * oldZoom);
    const zoomRatioY = mouseY / (this.#canvas.height * oldZoom);

    this.#canvas.width = newWidth;
    this.#canvas.height = newHeight;

    this.offset.x = (this.offset.x + mouseX) * (1 - zoomFactor);
    this.offset.y = (this.offset.y + mouseY) * (1 - zoomFactor);

    this.offset.x -= (newWidth - this.#canvas.width) * zoomRatioX;
    this.offset.y -= (newHeight - this.#canvas.height) * zoomRatioY;

    this.center = {
      x: this.#canvas.width / 2,
      y: this.#canvas.height / 2,
    };

    this.#gridItemSize = this.#canvas.width / this.#gridSize;

    this.#redrawFilledCells();

    this.#createBackground();
    event.preventDefault();
  }

  #getMouse(event) {
    const rect = this.#canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    const gridX = Math.floor(mouseX / this.#gridItemSize);
    const gridY = Math.floor(mouseY / this.#gridItemSize);
    return { gridX, gridY };
  }

  #getTool(event) {
    const selectedColor = this.colorPalette.getSelectedColor();
    const { gridX, gridY } = this.getMouse(event);
    const cursor = document.querySelector(".customCursor");
    const toolType = cursor.getAttribute("tool-data");
    const x = gridX * this.#gridItemSize;
    const y = gridY * this.#gridItemSize;

    if (this.isSameCord(event)) return;
    switch (toolType) {
      case "pencil":
        this.#ctx.fillStyle = selectedColor;
        this.#ctx.fillRect(x, y, this.#gridItemSize, this.#gridItemSize);
        console.log({ x, y, color: selectedColor });
        this.#filledCells.push({ x, y, color: selectedColor });
        this.setNewCell(event);

        return;
      case "eraser":
        // this.#ctx.clearRect(
        //   grid.x * this.#gridItemSize,
        //   grid.y * this.#gridItemSize,
        //   this.#gridItemSize,
        //   this.#gridItemSize
        // );
        console.log("his.#filledCells", this.#filledCells);
        this.#filledCells.filter((cell) => cell.x !== x && cell.y !== y);
        break;
      case "magnifying":
        break;
      default:
        break;
    }
  }

  #createBackground() {
    new MainBackground(
      {
        selector: document.querySelector("#gridCanvas"),
      },
      this.#canvas.width,
      this.#gridSize
    );
  }

  #redrawFilledCells() {
    const filledCells = this.#filledCells;
    this.#ctx.clearRect(0, 0, this.#canvas.width, this.#canvas.height);
    this.#createBackground();
    filledCells.forEach((cell) => {
      const x = cell.x * this.#gridItemSize;
      const y = cell.y * this.#gridItemSize;
      this.#ctx.fillStyle = cell.color;
      this.#ctx.fillRect(x, y, this.#gridItemSize, this.#gridItemSize);
    });
  }

  #isSameCord(event) {
    const { gridX: currentX, gridY: currentY } = this.getMouse(event);
    console.log(this.#currentCell.x, this.#currentCell.y);
    return this.#currentCell.x === currentX && this.#currentCell.y === currentY;
  }
  #setNewCell(event) {
    const { x: gridX, y: gridY } = this.getMouse(event);

    if (this.#currentCell.x !== gridX) {
      this.#currentCell.x = gridX;
    }
    if (this.#currentCell.y !== gridY) {
      this.#currentCell.y = gridY;
    }
  }
}
