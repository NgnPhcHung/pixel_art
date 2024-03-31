class LayerManagement {
  #layers;
  #layerRenderer;
  static dragStartIndex;

  constructor() {
    this.#layers = document.querySelectorAll("#gridCanvas");
    this.#layerRenderer = document.querySelector("#layerList");
  }

  addLayer() {
    const layerCard = new LayerCard();
    this.#layerRenderer.appendChild(layerCard.layerCard);

    this.#eventListeners();
  }
  #dragStart(card, cardList) {
    LayerManagement.dragStartIndex = cardList.indexOf(card);
    console.log(LayerManagement.dragStartIndex);
    // console.log(
    //   "start drag",
    //   Array.from(this.cardList).map((item) => item.getAttribute("name"))
    // );
  }
  #dragOver(event, card, cardList) {
    event.preventDefault();
    // console.log("dragOver");
    // cardList.forEach((otherCard) => {
    //   console.log(otherCard.getAttribute('name'))
    //   if (otherCard !== card) {
    //     otherCard.style.opacity = "0.7";
    //   }
    // });
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
      // Check if card is defined
      card.classList.remove("dragEnter");

      cardList.forEach((otherCard) => {
        if (otherCard) {
          // Check if otherCard is defined
          otherCard.style.opacity = "1";
        }
      });
    }
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
    });
  }

  #swapItems(list, fromIndex, toIndex) {
    const temp = list[fromIndex];
    list[fromIndex] = list[toIndex];
    list[toIndex] = temp;
  }
}
