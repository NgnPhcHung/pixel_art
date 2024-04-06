class LayerCard {
  constructor(newLayerName) {
    this.layerName = newLayerName;
    this.layerList = document.querySelectorAll("#layerCard");
    this.zIndex = this.#maxZIndexLayer(this.layerList);
    this.layerCard = document.createElement("div");
    this.layerCard.draggable = true;
    this.layerCard.classList.add("layerCard");
    this.layerCard.id = `layerCard_${this.layerList.length + 1 || 1}`;
    this.layerCard.style.zIndex = this.zIndex;
    this.layerCard.setAttribute("name", newLayerName);
    this.layerCard.innerHTML = `
      <span>Layer ${this.layerList.length + 1 || 1}</span>
      <span>
      <input type="checkbox" id="checkBox_${newLayerName}" onchange={this.#toggleLayer}/>
      <button id="export_${newLayerName}">Export</button>
      </span>
    `;
    // Attach event listener to the checkbox
    const exportButton = this.layerCard.querySelector(
      `#export_${newLayerName}`
    );
    const checkbox = this.layerCard.querySelector(`#checkBox_${newLayerName}`);
    checkbox.addEventListener("change", this.toggleLayer.bind(this));
    exportButton.addEventListener("click", this.saveAs.bind(this));
  }
  toggleLayer(event) {
    const currentLayer = document.getElementById(this.layerName);
    currentLayer.style.visibility = event.target.checked ? "hidden" : "visible";
  }
  saveAs() {
    const canvas = document.getElementById(this.layerName)
    const dataURL = canvas.toDataURL("image/png");

    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "layer_image.png"; 
    link.click();
  }

  #maxZIndexLayer(listDiv) {
    let maxZIndex = Number.MIN_SAFE_INTEGER;
    let divWithMaxZIndex = null;

    for (let i = 0; i < listDiv.length; i++) {
      var zIndex = parseInt(window.getComputedStyle(listDiv[i]).zIndex);

      if (!isNaN(zIndex) && zIndex > maxZIndex) {
        maxZIndex = zIndex;
        divWithMaxZIndex = listDiv[i];
      }
    }
    return divWithMaxZIndex;
  }
}
