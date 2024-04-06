class MainBackground {
  constructor( width, size) {
    this.newBackground = document.createElement("canvas");
    this.newBackground.width = width;
    this.newBackground.height = width;
    this.newBackground.id = "chessboard";

    this.options = {
      width: width,
      size: size,
      light: "#ffffff",
      dark: "#f0f0f0",
    };

    this.draw();
  }

  draw() {
    const el = this.newBackground;
    const ctx = el.getContext("2d");
    const squareWidth = el.width / this.options.size;
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
    const container = document.querySelector("#canvasContainer");
const existingChildren = document.querySelectorAll("#chessboard");

existingChildren.forEach(child => {
  if (child.id === "chessboard") {
    child.parentNode.removeChild(child);
  }
});

container.appendChild(this.newBackground);
  }
}
