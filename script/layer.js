class Canvas {
  #zIndex;

  constructor(zIndex) {
    this.#zIndex = zIndex;
  }

  create() {
    const artContainer = document.getElementById("artContainer");
    const newCanvas = document.createElement("canvas");

    newCanvas.style.background = "transparent";
    newCanvas.id = "gridCanvas";
    newCanvas.width = 640;
    newCanvas.height = 640;
    newCanvas.style.zIndex = this.#zIndex;

    artContainer.appendChild(newCanvas);
  }
}
