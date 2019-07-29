/*
  Simple BlackJack Game
  Iteration 2 -- Add Loops
*/

let cardSuits = [ 'Clubs', 'Hearts', 'Diamonds', 'Spades' ];
let cardValues = [ 'Ace', 'King', 'Queen', 'Jack', 'Ten', 'Nine',
  'Eight', 'Seven', 'Six', 'Five', 'Four', 'Three', 'Two' ];
let deckOfCards = [];

// Create deck of cards
for ( let suitIndex = 0; suitIndex < cardSuits.length; suitIndex++ ) {
  for ( let cardIndex = 0; cardIndex < cardValues.length; cardIndex++ ) {
    deckOfCards.push(`${cardValues[cardIndex]} of ${cardSuits[suitIndex]}`);
  }
}

let playerCards = [ deckOfCards[0], deckOfCards[2] ];

console.log('Welcome to Blackjack!');

console.log('You are dealt:');
console.log(`\t${playerCards[0]}`);
console.log(`\t${playerCards[1]}`)