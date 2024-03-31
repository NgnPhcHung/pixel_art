class LayerCard {
  constructor() {
    this.layerList = document.querySelectorAll("#layerCard");
    this.zIndex = this.#maxZIndexLayer(this.layerList);
    this.layerCard = document.createElement("div");
    this.layerCard.draggable = true;
    this.layerCard.id = "layerCard";
    this.layerCard.style.zIndex = this.zIndex;
    this.layerCard.setAttribute(
      "name",
      `Layer ${this.layerList.length + 1 || 1}`
    );
    this.layerCard.innerHTML = `Layer ${this.layerList.length + 1 || 1}`;
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
