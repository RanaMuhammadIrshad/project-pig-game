"use strict";
//Selecting elements
const score0EL = document.querySelector("#score--0");
const score1EL = document.getElementById("score--1");

const diceEL = document.querySelector(".dice");

const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

const current0EL = document.getElementById("current--0");
const current1EL = document.getElementById("current--1");

const player0EL = document.querySelector(".player--0");
const player1EL = document.querySelector(".player--1");

let scores, currentScore, activePlayer, playing;

// Starting conditions
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true; //state variable

  score0EL.textContent = 0;
  score1EL.textContent = 0;
  current0EL.textContent = 0;
  current1EL.textContent = 0;

  diceEL.classList.add("hidden"); //added hidden class in style.ccs
  player0EL.classList.remove("player--winner");
  player1EL.classList.remove("player--winner");
  player0EL.classList.add("player--active");
  player1EL.classList.remove("player--active");
};

init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;

  player0EL.classList.toggle("player--active");
  player1EL.classList.toggle("player--active");
};

//Rolling dice functionality
btnRoll.addEventListener("click", function () {
  if (playing) {
    // 1. Generate a random dice roll
    const dice = Math.trunc(Math.random() * 6 + 1);
    // 2. Display dice
    diceEL.classList.remove("hidden");
    diceEL.src = `dice-${dice}.png`;
    // 3. Check for the rolled 1
    if (dice !== 1) {
      // dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    // 1. add current score to active  player score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Check if the score is >= 100
    if (scores[activePlayer] >= 100) {
      // Finish the game
      playing = false;
      diceEL.classList.add("hidden");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--active");
    } else {
      // Switch to player 2
      switchPlayer();
    }
  }
});

btnNew.addEventListener("click", init);
