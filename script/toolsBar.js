const PENCIL = ` <i class="fa fa-pencil btn toolActive" id="tool-pencil"aria-hidden="true"></i>`;
const ERASER = `<i class="fa fa-eraser btn" id="tool-eraser"aria-hidden="true"></i>`;
const ZOOMIN = `<i class="fa fa-search-plus btn" id="tool-zoomin"aria-hidden="true"></i>
`;
const ZOOMOUT = `
<i class="fa fa-search-minus btn"  id="tool-zoomout"aria-hidden="true"></i>
`;

class ToolBar {
  constructor() {
    this.loadElement.bind(this);
    this.pencilHandler = this.pencilHandler.bind(this);
    this.eraserHandler = this.eraserHandler.bind(this);
    this.zoomInHandler = this.zoomInHandler.bind(this);
    this.zoomOutHandler = this.zoomOutHandler.bind(this);
    this.buttonClickAction = this.buttonClickAction.bind(this);
  }

  loadElement() {
    const toolBar = document.getElementById("toolBar");
    toolBar.innerHTML = PENCIL + ERASER + ZOOMIN + ZOOMOUT;

    const pencil = document.getElementById("tool-pencil");
    const eraser = document.getElementById("tool-eraser");
    const zoomin = document.getElementById("tool-zoomin");
    const zoomout = document.getElementById("tool-zoomout");

    pencil.addEventListener("click", this.pencilHandler);
    eraser.addEventListener("click", this.eraserHandler);
    zoomin.addEventListener("click", this.zoomInHandler);
    zoomout.addEventListener("click", this.zoomOutHandler);
  }

  pencilHandler(event) {
    this.buttonClickAction(event, "pencil");
  }

  eraserHandler(event) {
    this.buttonClickAction(event, "eraser");
  }

  zoomInHandler(event) {
    this.buttonClickAction(event, "magnifying");
  }

  zoomOutHandler(event) {
    this.buttonClickAction(event);
  }

  buttonClickAction(event, cursorName) {
    const toolBar = document.getElementById("toolBar");
    const children = toolBar.childNodes;

    children.forEach((child) => {
      if (child.classList && child.classList.contains("toolActive")) {
        child.classList.remove("toolActive");
      }
    });
    const cursorSelector = {
      magnifying: "url(assets/magnifying.svg)",
      eraser: "url(assets/eraser.svg)",
      pencil: "url(assets/pencil.svg)",
    };

    const cursor = document.querySelector(".customCursor");
    cursor.style.backgroundImage = cursorSelector[cursorName];
    cursor.setAttribute("tool-data", cursorName);
    event.target.classList.add("toolActive");
  }
}
