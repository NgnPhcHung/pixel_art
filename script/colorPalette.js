class ColorPalette {
  constructor() {
    this.colors = ["#ffffff", "#000000"];
    this.selected = this.colors[1];
    this.isGenerated = false;

    this.load = this.load.bind(this);
    this.getSelectedColor = this.getSelectedColor.bind(this);
    this.addColor = this.addColor.bind(this);
  }

  load() {
    const colorPalette = document.querySelector("#colorPalette");
    this.colors.forEach((color) => {
      const newColorInput = document.createElement("input");
      newColorInput.value = color;
      newColorInput.type = "color";

      newColorInput.addEventListener("click", (event) => {
        this.selected = newColorInput.value;
      });

      newColorInput.addEventListener("input", (event) => {
        this.selected = event.target.value;
        color = this.selected;
      });
      colorPalette.appendChild(newColorInput);
    });
  }
  getSelectedColor() {
    return this.selected;
  }

  addColor() {
    this.colors.push("#000000");
    const colorPalette = document.querySelector("#colorPalette");
    const newColorInput = document.createElement("input");
    newColorInput.value = "#000000";
    newColorInput.type = "color";
    newColorInput.addEventListener("click", (event) => {
      this.selected = newColorInput.value;
    });

    newColorInput.addEventListener("input", (event) => {
      this.selected = event.target.value;
    });
    colorPalette.appendChild(newColorInput);
  }
}
