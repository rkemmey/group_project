//WordleGame.jsx
import './wordle.css'
import Board from './wordle_components/Board';
import KeyBoard from './wordle_components/KeyBoard';
import GameOver from './wordle_components/GameOver';
import { boardDefault, generateWord } from './Words';
import { useState, useEffect } from 'react';
import { WordleContext } from './WordleContext';

const WordleGame = () => {
  // gameboard (6 rows of 5 letters for 6 attempts)
  const [board, setBoard] = useState(boardDefault)
  // current attempt tracking row (attempt) and column (letterPos)
  const [currAttempt, setCurrAttempt] = useState({ attempt: 0, letterPos: 0})
  // guessed letters that aren't in correct word
  const [disabledLetters, setDisabledLetters] = useState([])
  // word to guess
  const [correctWord, setCorrectWord] = useState("")
  // tracks whether the game has ended and if the user guessed correctly
  const [gameOver, setGameOver] = useState({
    gameOver: false,
    guessedWord: false,
  })

  // on mount, generate word list and choose word from that list
  useEffect(() => {
    generateWord().then((words) => {
      // converts to uppercase to match user's input
      setCorrectWord(words.todaysWord.toUpperCase())
    })
  }, [])

  // when a letter key is selected, update the current board
  const onSelectLetter = (keyVal) => {
    // prevents adding more then 5 letters in a row
    if (currAttempt.letterPos > 4) return;
    const newBoard = [...board]
    newBoard[currAttempt.attempt][currAttempt.letterPos] = keyVal
    setBoard(newBoard)
    setCurrAttempt({...currAttempt, letterPos: currAttempt.letterPos + 1})
  }

  // handles deleting a letter from the current row
  const onDelete = () => {
    if (currAttempt.letterPos === 0) return;
    const newBoard = [...board]
    newBoard[currAttempt.attempt][currAttempt.letterPos - 1] = "";
    setBoard(newBoard)
    setCurrAttempt({...currAttempt, letterPos: currAttempt.letterPos - 1})
  }

  // submits curent guess when user hits "Enter"
  const onEnter = () => {
    // only proceed if 5 letters are entered
    if (currAttempt.letterPos !== 5) return;

    // joins leters in current atttempt to form guessed word
    let currWord = "";
    for (let i = 0; i < 5; i++) {
      currWord += board[currAttempt.attempt][i];
    }
    // check if the word is correct
    if (currWord === correctWord) {
      setGameOver({ gameOver: true, guessedWord: true });
    // if last attempt and guess is wrong, end game
    } else if (currAttempt.attempt === 5) {
      setGameOver({ gameOver: true, guessedWord: false });
    }
    // otherwise, move to next row (attempt)
    setCurrAttempt({ attempt: currAttempt.attempt + 1, letterPos: 0 });
  };

  // resets the game by refreshing the page
  const handleReset = () => {
    window.location.reload();
  }

  return (
    <div className="wordleGame">
      <WordleContext.Provider 
        value={{
          board, setBoard, 
          currAttempt, setCurrAttempt, 
          onSelectLetter, onDelete, onEnter, 
          correctWord, 
          disabledLetters, setDisabledLetters, 
          gameOver, setGameOver}}>
        <div className="wordleGame">
          <Board />
          <button onClick={handleReset} className="reset-button">Reset</button>
          {/* display keyboard or game over component depending on game state */}
          {gameOver.gameOver ? <GameOver /> : <KeyBoard />}
        </div>
      </WordleContext.Provider>
    </div>
  );
};

export default WordleGame;