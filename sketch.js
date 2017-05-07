// TO-DO: Get the "Stay" button to work
// TO-DO: Allow the user to play again
// TO-DO: Show what the dealers hand was upon ending the game
// TO-DO: Allow the game to count Aces as both 1 and 11 points

// This function takes a card in the format "xy(y)" where x is a letter and the y(s) are numbers
// It then splits it into a list, extracts the value of the card and returns the value

function drawCardSprite(hand, card, y) {
  this.w = 100;
  this.h = 150;
  this.x = 100;
  this.spacing = 150;
  this.y = y;

  for(var i = 0; i < hand.length; i++) {
    rectMode(CENTER);
    fill(255);
    rect(this.x, this.y, this.w, this.h, 8);

    fill(0);
    noStroke();
    textAlign(CENTER);
    textSize(22);
    text(hand[i], x, y);
    this.x += this.spacing;
  }
}

function playerHandSprite() {
  textSize(32);
  textAlign(LEFT);
  fill(255);
  text("Your hand", 50, 375);
  for(var i = 0; i < playerHand.length; i++) {
    drawCardSprite(playerHand, playerHand[i], 500);
  }
  playerSum = getSum(playerHand);
  sumText = "Your sum: " + playerSum;
  textSize(32);
  textAlign(LEFT);
  fill(255);
  text(sumText, 50, height-100);
}

function dealerHandSprite() {
  textSize(32);
  textAlign(LEFT);
  fill(255);
  text("Dealer's hand", 50, 75);
  for(var i = 0; i < dealerHand.length; i++) {
    drawCardSprite(dealerHand, dealerHand[i], 200);
  }
}

function checkGameStatus() {
  var playerSum = getSum(playerHand);
  var dealerSum = getSum(dealerHand);
  statusMessage = "";

  // Generate an endScreenMessage based on the relationship between playerSum and dealerSum
  if(dealerSum > 21) {
    statusMessage = "Dealer busts, you win!";
  } else if(playerSum > 21) {
    statusMessage = "Over 21, you bust and lose";
  } else if(playerSum == dealerSum) {
    statusMessage = "Draw!";
  } else if(playerSum > dealerSum) {
    if(playerSum == 21) {
      statusMessage = "You win with blackjack!";
    } else {
      statusMessage = "You have the better hand, you win!";
    }
  } else if(playerSum < dealerSum) {
    statusMessage = "Dealer has the better hand, you lose";
  }
  return statusMessage;
}

function displayEndScreen() {
  endScreen = checkGameStatus();
  fill(255);
  textSize(32);
  textAlign(CENTER);
  text(endScreen, 50, 500);
}

function playGame() {
  playerHandSprite();
  dealerHandSprite();
  $("#hit-me").click(function() {
    hitMe();
  })
}

function setup() {
  createCanvas(800, 800);
  createDeck();
  shuffleDeck();
  dealHands();
}

function draw() {
  background(66, 244, 155);
  playGame();
}
