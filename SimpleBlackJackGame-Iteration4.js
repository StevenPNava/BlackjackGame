/*
  Simple BlackJack Game
  Iteration 4 -- Adding Objects
*/

// Create deck of cards
function createDeckofCards() {
  let deckOfCards = [];
  for ( let suitIndex = 0; suitIndex < cardSuits.length; suitIndex++ ) {
    for ( let cardIndex = 0; cardIndex < cardValues.length; cardIndex++ ) {
      let card = {
        suit: cardSuits[suitIndex],
        value: cardValues[cardIndex]
      };
      deckOfCards.push( card );
    }
  }
  return deckOfCards;
}

// Since we are not using a local variable it uses the 'global' variable
function getNextCard() {
  return deckOfCards.shift(); // will take first card off front and shift down
}

function getCardString( card ) {
  return `${ card.value } of ${ card.suit }`;
}


let cardSuits = [ 'Clubs', 'Hearts', 'Diamonds', 'Spades' ];
let cardValues = [ 'Ace', 'King', 'Queen', 'Jack', 'Ten', 'Nine',
  'Eight', 'Seven', 'Six', 'Five', 'Four', 'Three', 'Two' ];
let deckOfCards = createDeckofCards();
let playerCards = [ getNextCard(), getNextCard() ];

console.log('Welcome to Blackjack!');

console.log('You are dealt:');
console.log(`\t${ getCardString( playerCards[0] ) }`);
console.log(`\t${ getCardString( playerCards[1] ) }`);