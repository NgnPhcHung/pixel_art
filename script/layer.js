class Layer {
  zIndex;
  layerList;

  constructor(zIndex) {
    this.zIndex = zIndex;
  }

  create() {
    const artContainer = document.getElementById("artContainer");
    const newCanvas = document.createElement("canvas");
    const layerManagement = new LayerManagement();

    newCanvas.style.background = "#a0a0a0";
    newCanvas.style.position = "absolute";
    newCanvas.id = "gridCanvas";
    newCanvas.width = 640;
    newCanvas.height = 640;
    newCanvas.style.zIndex = this.zIndex;
    newCanvas.addEventListener("contextmenu", function (event) {
      event.preventDefault();
    });
    artContainer.appendChild(newCanvas);
    layerManagement.addLayer();
    // this.layerManagement.addLayer();

    // for (var i = 0; i < 64; i++) {
    //   newCanvas.appendChild(
    //     document.createElement("div")
    //   ).style.backgroundColor =
    //     parseInt(i / 8 + i) % 2 == 0 ? "#ababab" : "white";
    // }
  }
}
