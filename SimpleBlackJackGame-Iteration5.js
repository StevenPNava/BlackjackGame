/*
  Simple BlackJack Game
  Iteration 5

  In this version everything was refactored and put
  in its own function. The DOM elements were tied to
  functions and integrated to work together. Scoring
  and messaging were added and logging was removed.
  Functionally, everything is as it should be.

  Things to Do in Future:
    Add pictures and animations
    Add sound
    Add CSS

  by: Steven Nava
*/

// Create deck of cards
function createDeckofCards() {
  let deckOfCards = [];
  for ( let suitIndex = 0; suitIndex < cardSuits.length; suitIndex++ ) {
    for (let cardIndex = 0; cardIndex < cardValues.length; cardIndex++) {
      let card = {
        suit: cardSuits[suitIndex],
        value: cardValues[cardIndex]
      };
      deckOfCards.push( card );
    }
  }
  return deckOfCards;
}

function getNextCard() {
  return deckOfCards.shift();
}

function getRandomCard() {
  return Math.floor( Math.random() * deckOfCards.length );
}

function swapCardLocations( swapCardIndex, cardIndex)  {
  let temporaryCard = deckOfCards[swapCardIndex];
  deckOfCards[swapCardIndex] = deckOfCards[cardIndex];
  deckOfCards[cardIndex] = temporaryCard;
}

function setPlayerAndDealerHandsToEmpty() {
  playerCards = [];
  dealerCards = [];
}

function shuffleDeckOfCards() {
  for( let cardIndex = 0; cardIndex < deckOfCards.length; cardIndex++ ) {
    let swapCardIndex = getRandomCard();
    swapCardLocations( swapCardIndex, cardIndex );
  }
}

function shuffleCardsAndDeal() {
  shuffleDeckOfCards();
  dealInitialDealerCards();
  dealInitialPlayerCards();
}

function setWelcomeStatus() {
  welcomeHeading.innerText = 'Let\'s play Blackjack!';
}

function getCardString( card ) {
  return `${ card.value } of ${ card.suit }`;
}

function createCardString( cardArray ) {
  let cardString = '',
      lastCardInArray = cardArray.length - 1,
      newLine = '\n';
  for ( let cardIndex = 0; cardIndex < cardArray.length; cardIndex++ ) {
    let card = cardArray[ cardIndex ];
    cardString += getCardString( card );
    if ( cardIndex !== lastCardInArray) {
      cardString += newLine;
    }
  }
  return cardString;
}

function printMessage( message ) {
  welcomeHeading.innerText += message;
}

function printDealerScore( dealerCardString ) {
  welcomeHeading.innerText =
      `Dealer has:
      ${dealerCardString}
      (score: ${ dealerScore })\n\n`;
}

function printPlayerScore( playerCardString ) {
  welcomeHeading.innerText +=
      `Player has:
      ${playerCardString}
      (score: ${ playerScore })\n\n`;
}

function printWinnerMessage() {
  if (playerWon) {
    printMessage( 'YOU WIN' );
  } else {
    printMessage( 'DEALER WINS' );
  }
}

function endGame() {
  printWinnerMessage();
  setNewGameButtonStatus();
}

function getCardValue( card ) {
  let cardValue = card.value,
      numericValue = 0;
  if ( cardValue === 'Ace' ) { // will be handled by calculateScoreWithAce (11 or 1)
  } else if ( cardValue === 'Two' ) {
    numericValue = 2;
  } else if ( cardValue === 'Three' ) {
    numericValue = 3;
  } else if ( cardValue === 'Four' ) {
    numericValue = 4;
  } else if ( cardValue === 'Five' ) {
    numericValue = 5;
  } else if ( cardValue === 'Six' ) {
    numericValue = 6;
  } else if ( cardValue === 'Seven' ) {
    numericValue = 7;
  } else if ( cardValue === 'Eight' ) {
    numericValue = 8;
  } else if ( cardValue === 'Nine' ) {
    numericValue = 9;
  } else { // Ten/Jack/Queen/King
    numericValue = 10;
  }
  return numericValue;
}

function calculateScoreWithAce( score ) {
  let aceMaxValue = 10,
      aceMinValue = 1;
  if( score + aceMaxValue > 21 ) {
    score += aceMinValue;
  } else {
    score += aceMaxValue;
  }
  return score;
}

function getScore( cardArray ) {
  let score = 0,
      hasAce = false;
  for ( let cardIndex = 0; cardIndex < cardArray.length; cardIndex++ ) {
    let card = cardArray[ cardIndex ];
    score += getCardValue( card );
    if ( card.value === 'Ace' ) {
      hasAce = true;
    }
  }
  if ( hasAce ) {
    score = calculateScoreWithAce( score );
  }
  return score;
}

function updateScores() {
  dealerScore = getScore( dealerCards );
  playerScore = getScore( playerCards );
}

function printGameStatus() {
  let playerCardString = createCardString( playerCards ),
      dealerCardString = createCardString( dealerCards );

  updateScores();
  printDealerScore( dealerCardString );
  printPlayerScore( playerCardString );
  if ( gameOver ) {
    endGame();
  }
}

function showStatus() {
  if ( !gameStarted ) {
    setWelcomeStatus();
  } else {
    printGameStatus();
  }
}

function putDealerCardsBackInDeck() {
  dealerCards.forEach( function (card) {
    deckOfCards.push( card );
  });
}

function putPlayerCardsBackInDeck() {
  playerCards.forEach( function (card) {
    deckOfCards.push( card );
  });
}

function gatherPlayerAndDealerCardsInDeck() {
  putDealerCardsBackInDeck();
  putPlayerCardsBackInDeck();
}

function hideHitAndStayButtons() {
  hitButton.style.display = 'none';
  stayButton.style.display = 'none';
}

function showNewGameButton() {
  newGameButton.style.display = 'inline';
}

function initializeNewGameButton() {
  newGameButton.addEventListener('click', function () {
    gameStarted = true;
    gameOver = false;
    playerWon = false;
    hitButton.style.display = 'inline';
    stayButton.style.display = 'inline';
    newGameButton.style.display = 'none';
    gatherPlayerAndDealerCardsInDeck();
    setPlayerAndDealerHandsToEmpty();
    shuffleCardsAndDeal();
    showStatus();
  });
}

function dealerTakeCards() {
  let addCardScore = maxScore - 3;
  while ( dealerScore < playerScore
          && playerScore <= maxScore
          && dealerScore < addCardScore ) {
      dealerCards.push( getNextCard() );
      updateScores();
  }
}

function determineWinner() {
  if ( playerScore > maxScore )  {
    playerWon = false;
  } else if ( dealerScore > maxScore ) {
    playerWon = true;
  } else if ( playerScore > dealerScore ) {
    playerWon = true;
  } else {
    playerWon = false;
  }
}

function checkForEndOfGame() {
  updateScores();
  if ( gameOver ) {
    dealerTakeCards();
  }
  if ( playerScore >= maxScore
        || dealerScore >= maxScore
        || gameOver ) {
    gameOver = true;
    determineWinner();
  }
}

function initializeHitButton() {
  hitButton.addEventListener('click', function () {
    playerCards.push( getNextCard() );
    checkForEndOfGame();
    showStatus();
  });
}

function initializeStayButton() {
  stayButton.addEventListener('click', function () {
    gameOver = true;
    checkForEndOfGame();
    showStatus();
  });
}

function setNewGameButtonStatus() {
  hideHitAndStayButtons();
  showNewGameButton();
}

function initializeGame() {
  setNewGameButtonStatus();
  initializeNewGameButton();
  initializeHitButton();
  initializeStayButton();
}

function dealInitialDealerCards() {
  dealerCards.push (getNextCard() );
  dealerCards.push( getNextCard() );
}

function dealInitialPlayerCards() {
  playerCards.push( getNextCard() );
  playerCards.push( getNextCard() );
}

// Card variables
let cardSuits = [ 'Clubs', 'Hearts', 'Diamonds', 'Spades' ];
    cardValues = [ 'Ace', 'King', 'Queen', 'Jack', 'Ten', 'Nine',
      'Eight', 'Seven', 'Six', 'Five', 'Four', 'Three', 'Two' ];

// DOM objects
let welcomeHeading = document.getElementById('welcome-heading' ),
    newGameButton = document.getElementById('new-game-button' ),
    hitButton = document.getElementById('hit-button' ),
    stayButton = document.getElementById('stay-button' );

// Game variables
let gameStarted = false,
    gameOver = false,
    playerWon = false,
    dealerCards = [],
    dealerScore = 0,
    playerCards = [],
    playerScore = 0,
    deckOfCards = [],
    maxScore = 21;

deckOfCards = createDeckofCards();
initializeGame();