// const WordleGame = () => {
  
//   return (
//     <div className="p-8 text-center">
//       <h2 className="text-4xl font-bold">WordleGame</h2>
//     </div>
//   );
// };

// export default WordleGame;
// WordleGame.jsx
import './wordle.css'
import Board from './wordle_components/Board';
import KeyBoard from './wordle_components/KeyBoard';
import { boardDefault, generateWordSet } from './Words';
import { useState, useEffect } from 'react';
import { WordleContext } from './WordleContext';

const WordleGame = () => {
  const [board, setBoard] = useState(boardDefault)
  const [currAttempt, setCurrAttempt] = useState({ attempt: 0, letterPos: 0})
  const [wordSet, setWordSet] = useState(new Set())

  const correctWord = "RIGHT"

  useEffect(() => {
    generateWordSet().then((words) => {
      setWordSet(words.wordSet)
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
    newBoard[currAttempt.attempt][currAttempt.letterPos -1] = "";
    setBoard(newBoard)
    setCurrAttempt({...currAttempt, letterPos: currAttempt.letterPos - 1})
  }

  const onEnter = () => {
    if (currAttempt.letterPos !== 5) return;
    setCurrAttempt({ attempt: currAttempt.attempt + 1, letterPos : 0});
  }

  return (
      <div className="wordleGame">
        <WordleContext.Provider 
          value={{board, setBoard, currAttempt, setCurrAttempt, onSelectLetter, onDelete, onEnter, correctWord}}>
          <div className="wordleGame">
            <Board />
            <KeyBoard />
          </div>
        </WordleContext.Provider>
      </div>
  );
};

export default WordleGame;




