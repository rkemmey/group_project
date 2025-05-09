//Letter.jsx
import { useContext, useEffect } from 'react'
import { WordleContext } from '../WordleContext';

const Letter = ({ letterPos, attemptVal }) => {
  const { board, correctWord, currAttempt, disabledLetters, setDisabledLetters } = useContext(WordleContext);
  // get specific letter at current position
  const letter = board[attemptVal][letterPos];
  const isCorrect = correctWord.toUpperCase()[letterPos] === letter;
  const isAlmost = letter !== "" && !isCorrect && correctWord.includes(letter);
  // holds CSS ClassName for stlying letter appropriately
  let letterState = "";
  // only assign styling if the attempt has already been made
  if (currAttempt.attempt > attemptVal) {
    if (isCorrect) {
      letterState = "correct";
    } else if (isAlmost) {
      letterState = "almost";
    } else {
      letterState = "error";
    }
  }

  // add letter to list of disabled keys if its incorrect and not already disabled
  useEffect(() => {
    if (
      letter !== "" &&
      !isCorrect &&
      !isAlmost &&
      !disabledLetters.includes(letter)
    ) {
      setDisabledLetters([...disabledLetters, letter]);
    }
  }, [currAttempt.attempt, letter, isCorrect, isAlmost, disabledLetters, setDisabledLetters]);  

  // displays letter with styling class based on "correctness"
  return (
    <div className="letter" id={letterState}>
      {letter}
    </div>
  );
};

export default Letter;