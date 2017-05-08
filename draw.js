function dealerCardSprite(hand, card, y) {
  w = 100;
  h = 150;
  x = 100;
  spacing = 150;
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

    noStroke();
    textAlign(CENTER);
    textSize(22);
    text(hand[i], x, this.y);

    x += spacing;
  }

  fill(0);
  noStroke();
  textAlign(CENTER);
  textSize(22);
  text(hand[0], 100, y);
}

function userCardSprite(hand, card, y) {
  w = 100;
  h = 150;
  x = 100;
  spacing = 150;
  this.y = y;

  for (var i = 0; i < hand.length; i++) {
    rectMode(CENTER);
    fill(255);
    rect(x, this.y, w, h, 8);

    fill(0);
    noStroke();
    textAlign(CENTER);
    textSize(22);
    text(hand[i], x, y);
    x += spacing;
  }
}

function playerHandSprite() {
  textSize(32);
  textAlign(LEFT);
  fill(255);
  text("Your hand", 50, 375);
  for (var i = 0; i < playerHand.length; i++) {
    userCardSprite(playerHand, playerHand[i], 500);
  }
  playerSum = getSum(playerHand);
  sumText = "Your sum: " + playerSum;
  textSize(28);
  textAlign(LEFT);
  fill(255);
  text(sumText, 50, height - 150);
}

function dealerHandSprite() {
  textSize(28);
  textAlign(LEFT);
  fill(255);
  text("Dealer's hand", 50, 75);
  for (var i = 0; i < dealerHand.length; i++) {
    dealerCardSprite(dealerHand, dealerHand[i], 200);
  }
}

function drawWinnerText() {
  var statusMessage = chooseWinner();
  fill(255);
  textSize(28);
  textAlign(LEFT);
  text(statusMessage, 50, height - 50);
}

function playerBust() {
  var statusMessage = "You bust with " + playerSum + ", dealer wins";
  fill(255);
  textSize(28);
  textAlign(LEFT);
  text(statusMessage, 50, height - 50);
}

function playerIsBust() {
  var playerSum = getSum(playerHand);
  return playerSum > 21;
}

function redrawSketch() {
  bust = playerIsBust();
  if(bust) {
    hidden = false;
    playerHandSprite();
    dealerHandSprite();
    playerBust();
  }
  playerHandSprite();
  dealerHandSprite();
  $("#stay-hand").click(function() {
    drawWinnerText();
  })
}
