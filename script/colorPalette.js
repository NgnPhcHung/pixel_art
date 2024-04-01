class ColorPalette {
  constructor() {
    this.colors = [
      "#ffffff",
      "#000000",
      "#E14D2A",
      "#CF0A0A",
      "#3E6D9C",
      "#6F38C5",
      "#ADDDD0",
      "#FF4A4A",
      "#CFD2CF",
      "#003865",
    ];
    this.selected = this.colors[1];
  }

  load() {
    const colorPalette = document.querySelector("#colorPalette");
    this.colors.forEach((color) => {
      const newColorInput = document.createElement("input");
      newColorInput.value = color;
      newColorInput.type = "color";

      newColorInput.addEventListener("click", (event) => {
        this.selected = event.target.value;
      });

      newColorInput.addEventListener("input", (event) => {
        const temp = this.selected;
        this.selected = event.target.value;
        this.colors[temp] = this.selected;
      });
      colorPalette.appendChild(newColorInput);
    });
  }
  getSelectedColor() {
    return this.selected;
  }
}
