// Draws the dealer's cards
function dealerCardSprite(hand, card, y) {
  var w = 75;
  var h = 125;
  var x = width/2+360;
  var spacing = -120;
  this.y = y;

  for (var i = 0; i < hand.length; i++) {
    rectMode(CENTER);
    fill(255);
    rect(x, this.y, w, h, 8);

    if(hidden) {
      fill(255);
    } else {
      fill(0);
    }
    // Draws the text for the rest of the dealer's cards
    noStroke();
    textAlign(CENTER);
    textSize(22);
    text(hand[i], x, this.y);

    x += spacing;
  }
  // Draws the text for the dealer's first card
  fill(0);
  noStroke();
  textAlign(CENTER);
  textSize(22);
  text(hand[0], width/2+360, y);
}

// Draws the user's cards
function userCardSprite(hand, card, y) {
  var w = 75;
  var h = 125;
  var x = width/2-360;
  var spacing = 120;
  this.y = y;

  for (var i = 0; i < hand.length; i++) {
    rectMode(CENTER);
    fill(255);
    rect(x, this.y, w, h, 8);

    // Draws the text for the user's cards
    fill(0);
    noStroke();
    textAlign(CENTER);
    textSize(22);
    text(hand[i], x, y);
    x += spacing;
  }
}

// Draws the text for the player's sum
function playerHandSprite() {
  var playerSum = getSum(playerHand);
  textSize(32);
  textAlign(LEFT);
  fill(255);
  text("Your sum: " + playerSum, width/2-360, 300);
  for (var i = 0; i < playerHand.length; i++) {
    userCardSprite(playerHand, playerHand[i], 400);
  }
}

// Draws the text that signifies where the dealer's hand is
function dealerHandSprite() {
  textSize(28);
  textAlign(RIGHT);
  fill(255);
  text("Dealer's hand", width/2+360, 55);
  for (var i = 0; i < dealerHand.length; i++) {
    dealerCardSprite(dealerHand, dealerHand[i], 150);
  }
}

// Draws the end-game text
function drawWinnerText() {
  fill(255);
  textSize(28);
  textAlign(CENTER);
  text(message, width/2, height - 50);
}

// Draws the text that shows if the player busts
function playerBust() {
  var playerSum = getSum(playerHand);
  var dealerSum = getSum(dealerHand);
  var statusMessage = "You bust with " + playerSum + ", dealer wins with " + dealerSum;
  fill(255);
  textSize(28);
  textAlign(CENTER);
  text(statusMessage, width/2, height-75);
}

function drawBalance() {
  balanceText = "Balance: " + balance;
  $("#balance-label").html(balanceText);
}

// Redraws the sketch
function redrawSketch() {
  background(48, 219, 110);
  drawBalance();
  bust = playerIsBust();
  playerHandSprite();
  dealerHandSprite();
  if(bust) {
    disableButtons();
    hidden = false;
    playerBust();
  }
}
