/*
  Simple BlackJack Game
  Iteration 3 -- Create Functions
*/

// Create deck of cards
function createDeckofCards() {
  let deckOfCards = [];
  for ( let suitIndex = 0; suitIndex < cardSuits.length; suitIndex++ ) {
    for ( let cardIndex = 0; cardIndex < cardValues.length; cardIndex++ ) {
      deckOfCards.push(`${cardValues[cardIndex]} of ${cardSuits[suitIndex]}`);
    }
  }
  return deckOfCards;
}

// Since we are not using a local variable it uses the 'global' variable
function getNextCard() {
  return deckOfCards.shift(); // will take first card off front and shift down
}

let cardSuits = [ 'Clubs', 'Hearts', 'Diamonds', 'Spades' ];
let cardValues = [ 'Ace', 'King', 'Queen', 'Jack', 'Ten', 'Nine',
  'Eight', 'Seven', 'Six', 'Five', 'Four', 'Three', 'Two' ];
let deckOfCards = createDeckofCards();
let playerCards = [ getNextCard(), getNextCard() ];

console.log('Welcome to Blackjack!');

console.log('You are dealt:');
console.log(`\t${playerCards[0]}`);
console.log(`\t${playerCards[1]}`)