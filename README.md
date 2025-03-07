# cyber-hangman

A simple browser-based Hangman game with a cyber theme. Guess the secret word by suggesting letters before the gallows are completed in 8 wrong guesses.

## How to Play
1. Open `index.html` in a web browser (e.g., Chrome, Firefox).
2. Click the "Play" button to start.
3. Guess letters by clicking the alphabet buttons.
4. Win by guessing the word before the gallows is complete (8 wrong guesses).
5. Lose if the gallows reaches the final stage (second leg).
6. Click "Play Again" to start a new game.

## Game Logic
- A random word is chosen from more than 500 words.
- Correct guesses reveal the letter in the word.
- Wrong guesses add a part to the gallows (horizontal beam, rope, head, body, arms, legs).
- The game ends after 8 wrong guesses or when the word is fully guessed.
- Gallows stages progression:
  1. Base and vertical rod (initial stage)
  2. Top horizontal beam
  3. Rope
  4. Head
  5. Body
  6. One arm
  7. Second arm
  8. One leg
  9. Second leg (game over)