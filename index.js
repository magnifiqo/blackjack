let firstCard = 0;
let secondCard = 0;
let extraCard = 0;
let playerSum = 0;
let hasBlackJack = false;
let gameActive = false;
let message = "";
let cards = "";
let dealerFirstCard = 0;
let dealerSecondCard = 0;
let dealerExtraCard = 0;
let dealerSum = 0;

// constants for buttons and text, that will be changed during the game
const cardsEl = document.getElementById("cards-el");
const sumEl = document.getElementById("sum-el");
const startBtn = document.getElementById("start-el");
const newcardBtn = document.getElementById("newcard-el");
const newGameBtn = document.getElementById("newgame-el");
const holdBtn = document.getElementById("hold-el");
const messageEl = document.getElementById("message-el");

// game functions start here

function disableBtns() {
  startBtn.style.display = "none";
  newcardBtn.style.display = "none";
  newGameBtn.style.display = "block";
  holdBtn.style.display = "none";
}
function sumUp() {
  updateText();
  checkResult();
}

function gameStarted() {
  if (gameActive) {
    startBtn.style.display = "none";
    newcardBtn.style.display = "block";
    newGameBtn.style.display = "block";
    holdBtn.style.display = "block";
  }
}

function checkResult() {
  console.log("Checking player result");
  if (playerSum <= 20) {
    console.log("Player result is below 20, offering to draw a card");
    message = "Do you want to draw a new card?";
  } else if (playerSum === 21) {
    playerWin();
  } else {
    lostGame();
  }
  updateText();
  console.log("Result is: " + playerSum);
}

function updateText() {
  if (gameActive === true) {
    sumEl.textContent = "Sum: " + playerSum;
    messageEl.textContent = message;
    cardsEl.textContent = "Cards: " + cards;
  } else {
    lostGame();
    gameActive = false;
  }
}

function lostGame() {
  console.log("The game has been lost.");
  message = "You're out of the game!";
  gameActive = false;
  disableBtns();
  cardsEl.textContent = "It is game over!";
  messageEl.textContent = "You have:" + playerSum;
  sumEl.textContent = "Dealer has: " + dealerSum;
}

function playerWin() {
  console.log("The game has been won.");
  messageEl.textContent = "Wohoo! You win!";
  cardsEl.textContent = "";
  sumEl.textContent = "";
  disableBtns();
}
function startGame() {
  console.log("Starting new game.");
  gameActive = true;
  firstCard = Math.floor(Math.random() * 11) + 1;
  secondCard = Math.floor(Math.random() * 11) + 1;
  cards = "First card: " + firstCard + " Second card: " + secondCard;
  playerSum = firstCard + secondCard;
  updateText();
  sumUp();
  gameStarted();
}

function newCard() {
  if (gameActive) {
    extraCard = Math.floor(Math.random() * 11) + 1;
    playerSum += extraCard;
    cardsEl.textContent = " Extra card: " + extraCard;
    sumUp();
  } else {
    newcardBtn.textContent = "You lost!";
  }
}

function holdGame() {
  console.log("Player chooses to hold.");
  disableBtns();
  messageEl.textContent = "You choose to hold. Now the dealer will draw.";
  setTimeout(dealerStart, 1000);
}

// dealer functions start
function dealerHit() {
  if (gameActive) {
    while (dealerSum < 16) {
      if (dealerSum === 0) {
        console.log("dealer has no cards, so two cards are drawn");
        // If dealer has no cards, draw two cards
        dealerFirstCard = Math.floor(Math.random() * 11) + 1;
        dealerSecondCard = Math.floor(Math.random() * 11) + 1;
        dealerSum = dealerFirstCard + dealerSecondCard;
        console.log("dealer has drawn: " + dealerSum);
      } else {
        let dealerExtraCard = Math.floor(Math.random() * 11) + 1;
        dealerSum += dealerExtraCard;
        console.log(
          "dealer already has cards, so drawing more. current result: " +
            dealerSum
        );
        if (dealerSum > 21) {
            playerWin();
            return;
        // If dealer has cards, keep drawing extra cards until sum is 16 or higher
      }
    } }
    checkWinner();
  }
}

// check for whoever has the highest score
function gameDraw() {
  console.log(
    "It is a draw! Player score: " + playerSum + ". Dealer score: " + dealerSum
  );
  messageEl.textContent = "DRAW!";
  cardsEl.textContent = "";
}
function checkWinner() {
    gameActive = false;
  if (dealerSum < playerSum) {
    playerWin();
    console.log("checkwinner function says player win.");
  } else if (dealerSum == playerSum) {
    console.log("checkwinner function says it's a draw");
    gameDraw();
  } else {
    dealerWon();
  }
}

function dealerWon() {
  console.log("Dealer has won the game with " + dealerSum);
  lostGame();
}

function dealerHold() {
  console.log("Dealer decides to hold. Score:" + dealerSum);
  messageEl.textContent = "Dealer decides to hold. Dealer score: " + dealerSum;
  checkWinner();
}

function dealerStart() {
  console.log("Dealer game starts.");
  dealerHit();
}

// button click listeners
holdBtn.addEventListener("click", function () {
  holdGame();
});
newcardBtn.addEventListener("click", function () {
  newCard();
});
newGameBtn.addEventListener("click", function () {
  startGame();
  newcardBtn.textContent = "Extra card";
});
startBtn.addEventListener("click", function () {
  startGame();
});
