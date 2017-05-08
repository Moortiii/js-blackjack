var hidden = true;
var message = "";

$(document).ready(function() {
  $("#hit-me").click(function() {
    disableBet();
    hitMe();
    redrawSketch();
  })
  $("#stay-hand").click(function() {
    hidden = false;
    disableButtons();
    redrawSketch();
    declareWinner();
    drawWinnerText();
    checkBets();
  })
  $("#play-again").click(function() {
    playAgain();
    redrawSketch();
  })
})

function disableButtons() {
  $("#stay-hand").attr("disabled", true);
  $("#hit-me").attr("disabled", true);
  $("#place-bet").attr("disabled", true);
}

function playAgain() {
  $("#stay-hand").attr("disabled", false);
  $("#hit-me").attr("disabled", false);
  $("#place-bet").attr("disabled", false);
  hidden = true;
  playerHand = [];
  dealerHand = [];
  createDeck();
  shuffleDeck();
  dealHands();
  redrawSketch();
}

function setup() {
  var canvas = createCanvas(windowWidth, windowHeight - 200);
  // Moves the canvas so it's inside a div on the page
  canvas.parent('sketch-holder');
  noLoop();
}

function draw() {
  playAgain();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight - 200);
}
