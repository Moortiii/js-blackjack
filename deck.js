var deck = [];
var suits = ["H", "C", "S", "D"]; // Hearts, clubs, spades, diamonds

function createDeck() {
  for(var i = 0; i < suits.length; i++) {
    for(var j = 1; j < 14; j++) {
      deck.push(suits[i] + j);
    }
  }
}

function discardCard() {
  deck.splice(0, 1); // Remove the last card from the deck
}

function drawCard() {
  var card = deck[0]; // Draw the last card from the deck
  discardCard(); // Discard the last card from the deck
  return card;
}

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
