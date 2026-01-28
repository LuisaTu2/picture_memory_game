const pairsCount = 8;
let flipCount = 0;
let countMatches = 0;

let firstCard = null;
let secondCard = null;

let flipBackInProgress = false;

let start = null;
let end = null;

const resetBtn = document.getElementById("resetBtn");
resetBtn.addEventListener("click", () => {
  resetGame();
});

const newGameBtn = document.getElementById("newGameBtn");
newGameBtn.addEventListener("click", () => {
  resetGame();
  initializeGame();
});

const themeSelect = document.getElementById("themeSelect");
themeSelect.value = "animals";
themeSelect.addEventListener("change", () => {
  const selectedTheme = themeSelect.value;
  updatePictures();
});

initializeGame();

function getShuffledPics() {
  let pics = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
  const pictureIds = [];
  for (let i = pairsCount * 2; i > 0; i--) {
    let rand = Math.floor(Math.random() * pics.length);
    let picId = pics.splice(rand, 1);
    pictureIds.push(picId);
  }
  return pictureIds;
}

function updatePictures() {
  const pictureIds = getShuffledPics();
  k = 0;
  for (i = 1; i <= 4; i++) {
    for (j = 1; j <= 4; j++) {
      const card = document.getElementById("te" + i + j);
      const pictureId = pictureIds[k];
      card.dataset.pictureId = pictureId;
      const themedUrl = applyTheme(themeSelect.value);
      card
        .querySelector(".teText-back")
        .style.setProperty("--img", `url(pics${themedUrl}${pictureId}.jpg)`);
      k++;
    }
  }
}

function initializeGame() {
  for (i = 1; i <= 4; i++) {
    for (j = 1; j <= 4; j++) {
      const card = document.getElementById("te" + i + j);

      // add event listener
      card.addEventListener("click", clickHandler);

      // add front and back cards
      card.innerHTML = `
      <div class="teText-inner">
        <div class="teText-front"></div>
        <div class="teText-back"></div>
      </div>
    `;
    }
  }
  updatePictures();
}

function clickHandler() {
  if (start === null) {
    start = new Date();
    themeSelect.disabled = true;
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
    flipCount = 0;
    firstCard = null;
    secondCard = null;

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
      flipCount = 0;
      firstCard = null;
      secondCard = null;
      flipBackInProgress = false;
    }, 300);
  }
}

function resetGame() {
  document
    .querySelectorAll(".teText")
    .forEach((card) => card.classList.remove("flipped"));

  firstCard = null;
  secondCard = null;
  flipCount = 0;
  countMatches = 0;
  flipBackInProgress = false;

  start = null;
  end = null;
  themeSelect.disabled = false;
}

function applyTheme(theme) {
  switch (theme) {
    case "fall":
      return "/fall/";
    case "animals":
      return "/";
  }
}
