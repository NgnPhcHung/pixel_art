// mouseSnap.js
class MouseSnap {
  constructor(gridSize) {
    this.gridElement = null;
    this.isMoving = false;
    this.gridSize = gridSize; // default grid size
  }

  startMoving(gridSize) {
    if (!this.isMoving) {
      this.isMoving = true;
      this.gridSize = gridSize;
      if (!this.gridElement) {
        this.createGridElement();
      }
      this.moveGrid();
    }
  }

  stopMoving() {
    if (this.isMoving) {
      this.isMoving = false;
    }
  }

  createGridElement() {
    this.gridElement = document.createElement("div");
    this.gridElement.id = "mouseFollower";
      
    this.gridElement.style.position = "fixed";
    this.gridElement.style.transform = "translate(10%, 10%)";
    this.gridElement.style.width = this.gridSize + "px";
    this.gridElement.style.height = this.gridSize + "px";
    this.gridElement.style.pointerEvents = "none"; 
    document.body.appendChild(this.gridElement);
  }

  moveGrid() {
    document.addEventListener("mousemove", (event) => {
      if (this.isMoving && this.gridElement) {
        const mouseX = event.clientX;
        const mouseY = event.clientY;
        const gridX = Math.floor(mouseX / this.gridSize) * this.gridSize;
        const gridY = Math.floor(mouseY / this.gridSize) * this.gridSize;
        this.gridElement.style.left = gridX + "px";
        this.gridElement.style.top = gridY + "px";
      }
    });
  }
}
