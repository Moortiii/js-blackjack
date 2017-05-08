// TO-DO: Allow the game to count Aces as both 1 and 11 points

var hidden = true;

$(document).ready(function() {
  $("#hit-me").click(function() {
    hitMe();
    redrawSketch();
  })
  $("#stay-hand").click(function() {
    hidden = false;
    disableButtons();
    redrawSketch();
  })
  $("#play-again").click(function() {
    playAgain();
    redrawSketch();
  })
})

function disableButtons() {
  $("#stay-hand").attr("disabled", true);
  $("#hit-me").attr("disabled", true);
}

function chooseWinner() {
  var statusMessage = "";
  var playerSum = getSum(playerHand);
  var dealerSum = getSum(dealerHand);
  var diff = abs(playerSum - dealerSum);
  if (dealerSum > 21) {
    statusMessage = "Dealer busts with " + dealerSum + ", you win!";
  } else if (playerSum == dealerSum) {
    statusMessage = "Draw!";
  } else if (playerSum > dealerSum) {
    if (playerSum == 21) {
      statusMessage = "You win with blackjack!";
    } else {
      statusMessage = "You have " + diff + " point(s) more than the dealer, you win!";
    }
  } else if (playerSum < dealerSum) {
    statusMessage = "Dealer beats you by " + diff + " point(s), you lose";
  }
  return statusMessage;
}

function playAgain() {
  $("#stay-hand").attr("disabled", false);
  $("#hit-me").attr("disabled", false);
  background(66, 244, 155);
  hidden = true;
  playerHand = [];
  dealerHand = [];
  createDeck();
  shuffleDeck();
  dealHands();
  redrawSketch();
}

function setup() {
  createCanvas(800, 800);
  noLoop();
}

function draw() {
  playAgain();
}
