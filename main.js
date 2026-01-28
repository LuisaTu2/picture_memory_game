let flipCount = 0;
let countMatches = 0;

let firstCard = null;
let secondCard = null;

let flipBackInProgress = false;

let start = null;
let end = null;

let picChoices = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];

// Assign an event handler and a front and back to each card
for (i = 1; i <= 4; i++) {
  for (j = 1; j <= 4; j++) {
    const cardId = "te" + i + j;
    const card = document.getElementById(cardId);
    card.addEventListener("click", clickHandler);

    card.innerHTML = `
      <div class="teText-inner">
        <div class="teText-front"></div>
        <div class="teText-back"></div>
      </div>
    `;
    let rand = Math.floor(Math.random() * picChoices.length);
    let picId = picChoices.splice(rand, 1);
    card.dataset.pictureId = picId;
    card
      .querySelector(".teText-back")
      .style.setProperty("--img", `url(Pics/${picId}.jpg)`);
  }
}

function clickHandler() {
  if (start === null) {
    start = new Date();
  }

  if (
    flipCount === 2 ||
    flipBackInProgress ||
    this.classList.contains("flipped")
  ) {
    return;
  }

  this.classList.add("flipped");
  flipCount++;

  if (firstCard === null) {
    firstCard = this;
    return;
  }
  secondCard = this;
  if (firstCard.dataset.pictureId === secondCard.dataset.pictureId) {
    countMatches++;

    if (countMatches === 8) {
      end = new Date();
      setTimeout(function () {
        alert(
          "Congratulations, you won! You completed the puzzle in " +
            (end.getTime() - start.getTime()) / 1000 +
            " seconds.",
        );
      }, 100);
      return;
    }
  } else {
    const card1 = firstCard;
    const card2 = secondCard;
    flipBackInProgress = true;
    setTimeout(() => {
      card1.classList.remove("flipped");
      card2.classList.remove("flipped");
      flipBackInProgress = false;
    }, 300);
  }
  flipCount = 0;
  firstCard = null;
  secondCard = null;
}
