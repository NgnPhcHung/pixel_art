class MainBackground {
  constructor(config, width, size) {
    const newBackground = document.createElement("canvas");
    newBackground.width = width;
    newBackground.height = width;
    newBackground.style.opacity = "0.2";
    newBackground.style.zIndex = 1;

    this.options = {
      selector: newBackground,
      width: width,
      size: size,
      light: "#ffffff",
      dark: "#f0f0f0",
    };

    if (config) Object.assign(this.options, config);
    this.draw();
  }

  draw() {
    const el = this.options.selector;
    const ctx = el.getContext("2d");
    const squareWidth = this.options.width / this.options.size;
    const totalSquares = Math.pow(this.options.size, 2);

    // Draw background color
    ctx.fillStyle = "#f0f0f0"; // Background color
    ctx.fillRect(0, 0, el.width, el.height);

    let x = 0,
      y = 0;

    for (let i = 0; i < totalSquares; i++) {
      if (i % this.options.size === 0 && i !== 0) {
        y++;
        x = 0;
      }

      ctx.beginPath();
      ctx.rect(x * squareWidth, y * squareWidth, squareWidth, squareWidth);
      ctx.fillStyle = (x + y) % 2 ? this.options.dark : this.options.light;
      ctx.fill();
      x++;
    }
  }
}
