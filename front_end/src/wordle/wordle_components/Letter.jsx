//Letter.jsx
import { useContext } from 'react'
import { WordleContext } from '../WordleContext';

const Letter = ({ letterPos, attemptVal }) => {
  const { board, correctWord, currAttempt } = useContext(WordleContext);
  const letter = board[attemptVal][letterPos];
  const isCorrect = correctWord[letterPos] === letter;
  const isAlmost = letter !== "" && !isCorrect && correctWord.includes(letter);
  let letterState = "";
  // check if the current attempt is greater than the attempt value
  if (currAttempt.attempt > attemptVal) {
    if (isCorrect) {
      letterState = "correct";
    } else if (isAlmost) {
      letterState = "almost";
    } else {
      letterState = "error";
    }
  }

  return (
    <div className="letter" id={letterState}>
      {letter}
    </div>
  );
};

export default Letter;