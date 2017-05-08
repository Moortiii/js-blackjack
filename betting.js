var balance = 10000;
var amountBet = 0;

// Checks if the player has busted
function playerIsBust() {
  var playerSum = getSum(playerHand);
  return playerSum > 21;
}

function declareWinner() {
  var winner = undefined;
  var playerSum = getSum(playerHand);
  var dealerSum = getSum(dealerHand);
  var difference = abs(playerSum - dealerSum);

  if(dealerSum > 21 && playerSum > 21) {
    message = "You bust, dealer wins with " + dealerSum;
    winner = "dealer";
  } else if(dealerSum < 21 && playerSum < 21 && playerSum < dealerSum) {
    message = "Dealer wins with " + dealerSum;
    winner = "dealer";
  } else if(dealerSum == 21 && playerSum == 21) {
    message = "Dealer wins with blackjack";
    winner = "dealer";
  } else if(playerSum == 21 && playerSum > dealerSum) {
    message = "You win with blackjack!";
    winner = "player";
  } else if(dealerSum < 21 && playerSum < 21 && playerSum > dealerSum) {
    message = "You win by " + difference + " points";
    winner = "player";
  }
  return winner;
}

// Clears the input field's value and disables the button
function disableBet() {
  $("#place-bet").attr("disabled", true);
}

// Gets the bet from the input field
function getBet() {
  value = abs($("#input-bet").val());
  if(value > balance) {
    value = balance;
  } else if(isNaN(value)) {
    value = 0;
  }
  amountBet = value;
}

// Removes the amount bet from balance and returns the amount bet
function placeBet() {
  if(amountBet > balance) {
    balance = 0;
  } else {
    balance -= amountBet;
  }
}

// Checks who won the bet and distributes cash accordingly
function checkBets() {
  winner = declareWinner();
  if(winner == "player") {
    balance += amountBet * 2;
  }
}

$(document).ready(function() {
  $("#place-bet").click(function(){
    disableBet();
    getBet();
    placeBet();
    redrawSketch();
  })
})
