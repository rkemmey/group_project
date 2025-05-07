// Key.jsx
import { useContext } from 'react'
import { WordleContext } from '../WordleContext';


const Key = ({ keyVal, bigKey} ) => {
  const { board, setBoard, currAttempt, setCurrAttempt } = useContext(WordleContext)
  
  const selectLetter = () => {
    const newBoard = [...board]
    newBoard[currAttempt.attempt][currAttempt.letterPos] = keyVal
    setBoard(newBoard)
    setCurrAttempt({...currAttempt, letterPos: currAttempt.letterPos + 1})

  }
  
  return (
    <div className="key" id={bigKey && "big"} onClick={selectLetter}>
      {keyVal}
    </div>
  )
};

export default Key;