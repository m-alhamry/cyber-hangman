
import { words } from './words_list.js';

/*-------------------------------- Constants --------------------------------*/
const gallows = [
    "./assets/gallows-satge-0.png", "./assets/gallows-satge-1.png",
    "./assets/gallows-satge-2.png", "./assets/gallows-satge-3.png",
    "./assets/gallows-satge-4.png", "./assets/gallows-satge-5.png",
    "./assets/gallows-satge-6.png", "./assets/gallows-satge-7.png",
    "./assets/gallows-satge-8.png"
];
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const maxWrongGuesses = 8;

/*---------------------------- Variables (state) ----------------------------*/
let secretWord = "";
let guessedLetters = [];
let wrongGuessesCounter = 0;

// Varibles to hold game elements when player start game
let gallowsImgContainerEl;
let gallowsImgEl;
let secretWordDisplayEl;
let lettersContainerEl;
let wrongGuessesCounterEl;
let messageDisplayEl;

/*------------------------ Cached Element References ------------------------*/
const descriptionEl = document.querySelector("#description");
const playAreaEl = document.querySelector("#play-area");
const playBtnEl = document.querySelector(".button");

/*----------------------------- Event Listeners -----------------------------*/
playBtnEl.addEventListener("click", play);

/*-------------------------------- Functions --------------------------------*/
function createGameElements() {
    gallowsImgContainerEl = document.createElement("div");
    secretWordDisplayEl = document.createElement("div");
    lettersContainerEl = document.createElement("div");
    wrongGuessesCounterEl = document.createElement("div");
    messageDisplayEl = document.createElement("div");
    gallowsImgEl = document.createElement("img");

    gallowsImgContainerEl.classList.add("gallows-img");
    secretWordDisplayEl.classList.add("word");
    lettersContainerEl.classList.add("letters");
    wrongGuessesCounterEl.classList.add("wrong-guesses-counter");
    messageDisplayEl.classList.add("message");

    playAreaEl.appendChild(gallowsImgContainerEl);
    gallowsImgContainerEl.appendChild(gallowsImgEl);
    playAreaEl.appendChild(secretWordDisplayEl);
    playAreaEl.appendChild(lettersContainerEl);
    playAreaEl.appendChild(wrongGuessesCounterEl);
    playAreaEl.appendChild(messageDisplayEl);
}

function play() {
    descriptionEl.remove();
    playBtnEl.removeEventListener("click", play);
    playBtnEl.addEventListener("click", playAgain);
    playBtnEl.textContent = "Play Again";
    createGameElements();
    resetGame();
}

function playAgain() {
    lettersContainerEl.innerHTML = ""; // Clear existing letter buttons
    resetGame();
}

function resetGame() {
    gallowsImgEl.src = gallows[0];
    guessedLetters = [];
    wrongGuessesCounter = 0;
    secretWord = words[Math.floor(Math.random() * words.length)].toUpperCase();
    messageDisplayEl.textContent = "";
    playBtnEl.hidden = true;
    updateSecretWordDisplay();
    createLetterButtons();
    updateDisplayedWrongGuessesCounter();
}

function updateSecretWordDisplay() {
    let text = '';
    secretWord.split('').forEach(char => {
        let temp;
        guessedLetters.forEach(letter => {
            if (char === letter) {
                temp = letter;
                return;
            }
        });
        temp ? text += `${temp} ` : text += "_ ";
    });
    secretWordDisplayEl.textContent = text.trim();
}

function createLetterButtons() {
    for (let letter of alphabet) {
        const button = document.createElement("button");
        button.classList.add("letter");
        button.textContent = letter;
        button.addEventListener("click", handleGuess);
        lettersContainerEl.appendChild(button);
    }
}

function updateDisplayedWrongGuessesCounter() {
    wrongGuessesCounterEl.textContent = `Wrong guesses: ${wrongGuessesCounter}/${maxWrongGuesses}`;
}

function handleGuess(event) {
    const letter = event.target.textContent;
    event.target.disabled = true;
    if (secretWord.includes(letter)) {
        guessedLetters.push(letter);
        updateSecretWordDisplay();
    } else {
        wrongGuessesCounter++;
        updateGallowsImage();
        updateDisplayedWrongGuessesCounter();
    }
    checkGameWinOrLost();
}

function updateGallowsImage() {
    gallowsImgEl.src = gallows[wrongGuessesCounter];
}

function checkGameWinOrLost() {
    if (!secretWordDisplayEl.textContent.includes("_")) {
        handleWinOrLost("win");
    } else if (wrongGuessesCounter >= maxWrongGuesses) {
        handleWinOrLost("lost");
    }
}

function handleWinOrLost(status) {
    messageDisplayEl.innerHTML = status === "win"
        ? "Congratulations! 🎉</br>You cracked the word! 🎯"
        : `Game Over! you lost 😢</br>The word was "${secretWord}"`;
    messageDisplayEl.style.color = status === "win" ? "cyan" : "red";
    playBtnEl.hidden = false;
    disableAllLetterBtns();
}

function disableAllLetterBtns() {
    const allLetterBtns = document.querySelectorAll(".letter");
    allLetterBtns.forEach(button => button.disabled = true);
}