import './wordle.css'
import Board from './wordle_components/Board';
import KeyBoard from './wordle_components/KeyBoard';
import GameOver from './wordle_components/GameOver';
import { boardDefault, generateWordSet } from './Words';
import { useState, useEffect } from 'react';
import { WordleContext } from './WordleContext';

const WordleGame = () => {
  const [board, setBoard] = useState(boardDefault)
  const [currAttempt, setCurrAttempt] = useState({ attempt: 0, letterPos: 0})
  const [disabledLetters, setDisabledLetters] = useState([])
  const [correctWord, setCorrectWord] = useState("")
  const [gameOver, setGameOver] = useState({
    gameOver: false,
    guessedWord: false,
  })

  useEffect(() => {
    generateWordSet().then((words) => {
      setCorrectWord(words.todaysWord.toUpperCase())
    })
  }, [])

  const onSelectLetter = (keyVal) => {
    if (currAttempt.letterPos > 4) return;
    const newBoard = [...board]
    newBoard[currAttempt.attempt][currAttempt.letterPos] = keyVal
    setBoard(newBoard)
    setCurrAttempt({...currAttempt, letterPos: currAttempt.letterPos + 1})
  }

  const onDelete = () => {
    if (currAttempt.letterPos === 0) return;
    const newBoard = [...board]
    newBoard[currAttempt.attempt][currAttempt.letterPos - 1] = "";
    setBoard(newBoard)
    setCurrAttempt({...currAttempt, letterPos: currAttempt.letterPos - 1})
  }

  const onEnter = () => {
    if (currAttempt.letterPos !== 5) return;

    let currWord = "";
    for (let i = 0; i < 5; i++) {
      currWord += board[currAttempt.attempt][i];
    }

    if (currWord === correctWord) {
      setGameOver({ gameOver: true, guessedWord: true });
    } else if (currAttempt.attempt === 5) {
      setGameOver({ gameOver: true, guessedWord: false });
    }

    setCurrAttempt({ attempt: currAttempt.attempt + 1, letterPos: 0 });
  };

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
          {gameOver.gameOver ? <GameOver /> : <KeyBoard />}
        </div>
      </WordleContext.Provider>
    </div>
  );
};

export default WordleGame;