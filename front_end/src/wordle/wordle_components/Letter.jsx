//Letter.jsx
import { useContext, useEffect } from 'react'
import { WordleContext } from '../WordleContext';

const Letter = ({ letterPos, attemptVal }) => {
  const { board, correctWord, currAttempt, disabledLetters, setDisabledLetters } = useContext(WordleContext);
  const letter = board[attemptVal][letterPos];
  const isCorrect = correctWord.toUpperCase()[letterPos] === letter;
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

  return (
    <div className="letter" id={letterState}>
      {letter}
    </div>
  );
};

export default Letter;