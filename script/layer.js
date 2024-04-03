class Layer {
  zIndex;
  layerList;

  constructor(zIndex) {
    this.zIndex = zIndex;
  }

  create() {
    const artContainer = document.getElementById("artContainer");
    const newCanvas = document.createElement("canvas");
    const layerList = document.querySelectorAll("#gridCanvas");
    const layerManagement = new LayerManagement();

    const newLayerName = `Layer_no.${layerList.length}`;

    newCanvas.style.background = "#a0a0a0";
    newCanvas.style.position = "absolute";
    newCanvas.id = "gridCanvas";
    newCanvas.width = 640;
    newCanvas.height = 640;
    newCanvas.style.zIndex = this.zIndex;
    newCanvas.classList.add(newLayerName);
    newCanvas.addEventListener("contextmenu", function (event) {
      event.preventDefault();
    });

    //append new layer to work space
    artContainer.appendChild(newCanvas);

    //append layer to layer list
    layerManagement.addLayer(newLayerName);
  }
}
