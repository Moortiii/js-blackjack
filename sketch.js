// TO-DO: Get the "Stay" button to work
// TO-DO: Allow the user to play again
// TO-DO: Show what the dealers hand was upon ending the game
// TO-DO: Allow the game to count Aces as both 1 and 11 points

var suits = ["h", "c", "s", "d"]; // Hearts, clubs, spades, diamonds
var deck = [];
var playerHand = [];
var dealerHand = [];

function createDeck() {
  for(var i = 0; i < suits.length; i++) {
    for(var j = 1; j < 14; j++) {
      deck.push(suits[i] + j);
    }
  }
}

// Shuffle the deck three times to make sure it's done properly
function shuffleDeck() {
  var firstShuffle = shuffle(deck);
  var secondShuffle = shuffle(firstShuffle);
  deck = shuffle(secondShuffle);
}

function discardCard() {
  deck.splice(0, 1); // Remove the last card from the deck
}

function drawCard() {
  var card = deck[0]; // Draw the last card from the deck
  discardCard(); // Discard the last card from the deck
  return card;
}


// This function takes a card in the format "xy(y)" where x is a letter and the y(s) are numbers
// It then splits it into a list, extracts the value of the card and returns the value
function getValue(card) {
  var cardList = card.split("");
  var stringValue = "";
  var intValue = 0;
  if(cardList.length >= 3) {
    stringValue = cardList[1] + cardList[2];
    intValue = parseInt(stringValue);
  } else {
    stringValue = cardList[1];
    intValue = parseInt(stringValue);
  }
  if(intValue >= 10) {
    intValue = 10;
  }
  return intValue;
}

// Grabs the sum of an arbitrary hand
function getSum(hand) {
  var sum = 0;
  for(var i = 0; i < hand.length; i++) {
    sum += getValue(hand[i]);
  }
  return sum;
}

function dealHands() {
  var p1Card = drawCard();
  var m1Card = drawCard();
  var p2Card = drawCard();
  var m2Card = drawCard();

  // The order at which the cards are added is important
  playerHand.push(p1Card);
  dealerHand.push(m1Card);
  playerHand.push(p2Card);
  dealerHand.push(m2Card);
}

function hitMe() {
  var newCard = drawCard();
  playerHand.push(newCard);
}

function dealerDraw() {
  var dealerSum = getSum(dealerHand);
  if(dealerSum < 17) {
    var newCard = drawCard();
    dealerHand.push(newCard);
    dealerSum = getSum(dealerHand);
  }
}

function drawPlayerHand() {
  var spacing = 0;
  var w = 60;
  var h = 105;
  for(var i = 0; i < playerHand.length; i++) {
    rectMode(CENTER);
    fill(255);
    rect(100+spacing, height/2, w, h);
    var cardValue = playerHand[i];
    fill(0);
    textAlign(CENTER);
    textSize(16);
    text(cardValue, 100 + spacing, height/2);
    spacing += 100;
  }
  var handSum = "Sum of your hand: " + getSum(playerHand);
  textSize(32);
  textAlign(CENTER);
  fill(255);
  text(handSum, width/2, 400);
}

function drawDealerHand() {
  var spacing = 0;
  var w = 60;
  var h = 105;
  for(var i = 0; i < dealerHand.length; i++) {
    rectMode(CENTER);
    fill(255);
    rect(100 + spacing, 100, w, h);
    spacing += 100;
  }
  var cardValue = dealerHand[0]; // We should only show the dealer's first card before the game has ended
  fill(0);
  textAlign(CENTER);
  textSize(16);
  text(cardValue, 100, 100);
}

function getEndScreenMessage() {
  var playerSum = getSum(playerHand);
  var dealerSum = getSum(dealerHand);
  endScreenMessage = "";

  // Generate an endScreenMessage based on the relationship between playerSum and dealerSum
  if(dealerSum > 21) {
    endScreenMessage = "Dealer busts, you win!";
  } else if(playerSum > 21) {
    endScreenMessage = "Over 21, you bust and lose";
  } else if(playerSum == dealerSum) {
    endScreenMessage = "Draw!";
  } else if(playerSum > dealerSum) {
    if(playerSum == 21) {
      endScreenMessage = "You win with blackjack!";
    } else {
      endScreenMessage = "You have the better hand, you win!";
    }
  } else if(playerSum < dealerSum) {
    endScreenMessage = "Dealer has the better hand, you lose";
  }
  return endScreenMessage;
}

function displayEndScreen() {
  endScreenMessage = getEndScreenMessage();
  fill(255);
  textSize(32);
  textAlign(CENTER);
  text(endScreenMessage, width/2, height-100);
}

function setup() {
  createCanvas(600, 600);
  createDeck();
  shuffleDeck();
  dealHands();
  var hit = createButton("Hit me");
  var stay = createButton("Stay");
  var playAgain = createButton("Play Again");
  hit.mousePressed(hitMe);
  hit.mousePressed(dealerDraw); // The function itself checks if the dealer should actually draw a card
  stay.mousePressed(displayEndScreen);
}

function draw() {
  background(127);
  drawDealerHand();
  drawPlayerHand();
  var playerSum = getSum(playerHand);
  if(playerSum > 21) {
    displayEndScreen();
  }
}
