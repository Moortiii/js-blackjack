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
  text(hand[0], width/2+360, y);
}

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

    fill(0);
    noStroke();
    textAlign(CENTER);
    textSize(22);
    text(hand[i], x, y);
    x += spacing;
  }
}

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

function dealerHandSprite() {
  textSize(28);
  textAlign(RIGHT);
  fill(255);
  text("Dealer's hand", width/2+360, 55);
  for (var i = 0; i < dealerHand.length; i++) {
    dealerCardSprite(dealerHand, dealerHand[i], 150);
  }
}

function drawWinnerText() {
  var statusMessage = chooseWinner();
  fill(255);
  textSize(28);
  textAlign(CENTER);
  text(statusMessage, width/2, height - 50);
}

function playerBust() {
  var playerSum = getSum(playerHand);
  var dealerSum = getSum(dealerHand);
  var statusMessage = "You bust with " + playerSum + ", dealer wins with " + dealerSum;
  fill(255);
  textSize(28);
  textAlign(CENTER);
  text(statusMessage, width/2, height-75);
}

function playerIsBust() {
  var playerSum = getSum(playerHand);
  return playerSum > 21;
}

function redrawSketch() {
  background(48, 219, 110);
  bust = playerIsBust();
  if(bust) {
    disableButtons();
    hidden = false;
    playerHandSprite();
    dealerHandSprite();
    playerBust();
  } else {
    playerHandSprite();
    dealerHandSprite();
    $("#stay-hand").click(function() {
      drawWinnerText();
    })
  }
}
