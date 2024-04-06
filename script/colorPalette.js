class ColorPalette {
  constructor() {
    this.colors = ["#000000", "#ffffff"];
    this.selected = this.colors[0];
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
      newColorInput.style.display = "inline-block";
      newColorInput.style.width = "30px !important";

      newColorInput.addEventListener("click", (event) => {
        this.#removeOtherActiveColor();
        newColorInput.classList.add("active");
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
    newColorInput.style.display="inline-block"
    newColorInput.addEventListener("click", (event) => {
      this.#removeOtherActiveColor();
      newColorInput.classList.add("active");
      this.selected = newColorInput.value;
    });

    newColorInput.addEventListener("input", (event) => {
      this.selected = event.target.value;
    });
    colorPalette.appendChild(newColorInput);
  }

  #removeOtherActiveColor() {
    const palette = document.getElementById("colorPalette");
    const childNodes = palette.childNodes;
    childNodes.forEach((child) => {
      if (child.classList.contains("active")) {
        child.classList.remove("active");
      }
    });
  }
}
