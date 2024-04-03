class LayerManagement {
  #layerRenderer;
  static dragStartIndex;

  constructor() {
    this.#layerRenderer = document.querySelector("#layerList");
  }

  addLayer(newLayerName) {
    const layerCard = new LayerCard(newLayerName);
    this.#layerRenderer.appendChild(layerCard.layerCard);

    this.#eventListeners();
  }
  #dragStart(card, cardList) {
    LayerManagement.dragStartIndex = cardList.indexOf(card);
  }
  #dragOver(event, card, cardList) {
    event.preventDefault();
  }

  #drop(card, cardList) {
    let dragEndIndex = -1;
    const currentCard = document.querySelector(".dragEnter");

    dragEndIndex = cardList.indexOf(currentCard);

    this.#swapItems(cardList, LayerManagement.dragStartIndex, dragEndIndex);
    this.#layerRenderer.innerHTML = "";

    cardList.forEach((layerCard) => {
      this.#layerRenderer.appendChild(layerCard);
    });

    cardList.forEach((otherCard) => {
      if (otherCard) {
        otherCard.style.opacity = "1";
      }
    });
  }

  #dragEnter(card, cardList) {
    if (card) {
      card.classList.add("dragEnter");
      cardList.forEach((otherCard) => {
        if (
          otherCard &&
          otherCard.getAttribute("name") !== card.getAttribute("name")
        ) {
          otherCard.style.opacity = "0.7";
        }
      });
    }
  }

  #dragLeave(card, cardList) {
    if (card) {
      card.classList.remove("dragEnter");

      cardList.forEach((otherCard) => {
        if (otherCard) {
          otherCard.style.opacity = "1";
        }
      });
    }
  }

  #selectLayer(card, cardList = []) {
    cardList.forEach((card) => {
      card.classList.contains("selected")
        ? card.classList.remove("selected")
        : card.classList.add("selected");
    });
  }

  #eventListeners() {
    const cardList = Array.from(document.querySelectorAll("#layerCard"));

    cardList.forEach((currentCard) => {
      currentCard.addEventListener("dragstart", () =>
        this.#dragStart(currentCard, cardList)
      );
      currentCard.addEventListener("dragover", (event) =>
        this.#dragOver(event, currentCard, cardList)
      );
      currentCard.addEventListener("drop", () =>
        this.#drop(currentCard, cardList)
      );

      currentCard.addEventListener("dragenter", () =>
        this.#dragEnter(currentCard, cardList)
      );
      currentCard.addEventListener("dragleave", () =>
        this.#dragLeave(currentCard, cardList)
      );
      currentCard.addEventListener("click", () =>
        this.#selectLayer(currentCard, cardList)
      );
    });
  }

  #swapItems(list, fromIndex, toIndex) {
    const temp = list[fromIndex];
    list[fromIndex] = list[toIndex];
    list[toIndex] = temp;
  }
}
