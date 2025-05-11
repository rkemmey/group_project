// Letter.jsx
import { useContext } from 'react';
import { WordleContext } from '../WordleContext';

const Letter = ({ letterPos, attemptVal }) => {
  const { board, correctWord, currAttempt } = useContext(WordleContext);
  // get specific letter at current position
  const letter = board[attemptVal][letterPos];
  const isCorrect = correctWord.toUpperCase()[letterPos] === letter;
  const isAlmost = letter !== "" && !isCorrect && correctWord.includes(letter);
  // holds CSS ClassName for styling letters appropriately
  let letterState = "";
  if (currAttempt.attempt > attemptVal) {
    if (isCorrect) {
      letterState = "correct";
    } else if (isAlmost) {
      letterState = "almost";
    } else {
      letterState = "error";
    }
  }

  // displays letter with sttling class based on correctness"
  return (
    <div className="letter" id={letterState}>
      {letter}
    </div>
  );
};

export default Letter;
