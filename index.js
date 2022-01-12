// 'use strict';

const playbtn = document.querySelector('#play-btn');
const messageEl = document.querySelector('#message-el');
const cardsEl = document.querySelector('#cards-el');
const sumEl = document.querySelector('.sum-el');
const newCardbtn = document.querySelector('#newcard-btn');
const playerEl = document.querySelector('#player-el');
const playAgainBtn = document.querySelector('#playagain-btn');

const getRandomCard = function (min, max) {
  let randomNumber = Math.floor(Math.random() * (max - min)) + 1;
  if (randomNumber > 10) {
    return 10;
  } else if (randomNumber === 1) {
    return 11;
  } else {
    return randomNumber;
  }
};

const startingCards = function () {};

let player = {
  name: 'Nikola',
  chips: 145,
};

let firstCard = getRandomCard(0, 11);
let secondCard = getRandomCard(0, 11);
let sum = firstCard + secondCard;
let hasBlackJack = false;
let isAlive = true;
let clicked = false;
playerEl.innerHTML = `${player.name}: $${player.chips}`;

let cards = [firstCard, secondCard];

const startGame = function () {
  renderGame();
};

const renderGame = function () {
  getRandomCard(0, 11);
  cardsEl.innerHTML = 'cards: ';
  for (let i = 0; i < cards.length; i++) {
    cardsEl.innerHTML += cards[i] + ' ';
  }

  sumEl.innerHTML = `Sum: ${sum}`;

  if (sum <= 20) {
    clicked = true;
    messageEl.innerHTML = `Do you want to draw a new card?`;
  } else if (sum === 21 && isAlive === true) {
    isAlive = false;
    messageEl.innerHTML = `You've got Blackjack!`;
    hasBlackJack = true;
    clicked = false;
    playerEl.innerHTML = `${player.name}: $${player.chips * 1.8}`;
    player.chips = player.chips * 1.8;
  } else if (sum > 21) {
    messageEl.innerHTML = `You're out of the game!`;
    isAlive = false;
    clicked = false;
    playerEl.innerHTML = `${player.name}: $${player.chips * 0}`;
    player.chips = player.chips * 0;
  }
};

const newCard = function () {
  let card = getRandomCard(0, 11);
  if (clicked === true && hasBlackJack === false) {
    sum += card;
    cards.push(card);
    console.log(cards);
    messageEl.innerHTML = 'drawning new card from the deck';
    renderGame();
    if (sum >= 21) {
      clicked = false;
    }
  }
};

playbtn.addEventListener('click', startGame);

newCardbtn.addEventListener('click', newCard);

const playAgain = function () {
  if (hasBlackJack === true || sum > 21) {
    location.reload();
  }
};

playAgainBtn.addEventListener('click', playAgain);
