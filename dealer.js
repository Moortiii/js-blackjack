var playerHand = [];
var dealerHand = [];

// Shuffle the deck three times to make sure it's done properly
function shuffleDeck() {
  var firstShuffle = shuffle(deck);
  var secondShuffle = shuffle(firstShuffle);
  deck = shuffle(secondShuffle);
}

function dealHands() {
  cards = []
  for(var i = 0; i < 4; i++) {
    cards[i] = drawCard();
  }
  playerHand.push(cards[0]);
  dealerHand.push(cards[1]);
  playerHand.push(cards[2]);
  dealerHand.push(cards[3]);
}

function hitMe() {
  newCard = drawCard();
  playerHand.push(newCard);
  dealerDraw();
}

function dealerDraw() {
  var dealerSum = getSum(dealerHand);
  while(dealerSum < 17) {
    var newCard = drawCard();
    dealerHand.push(newCard);
    dealerSum = getSum(dealerHand);
  }
}
